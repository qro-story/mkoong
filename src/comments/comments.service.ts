import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from '@libs/core/databases/entities/comment.entity';
import { CommentLike } from '../../libs/core/databases/entities/comment.like.entity';
import { CreateCommentDTO, CommentRO } from './dto/comment.dto';
import { CommonError, ERROR } from '@libs/core/types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    @InjectRepository(CommentLike)
    private commentLikeRepository: Repository<CommentLike>,
  ) {}

  async getCommentById(commentId: number): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new CommonError({
        error: ERROR.NO_EXISTS_DATA,
        message: '해당 댓글을 찾을 수 없습니다.',
      });
    }
    return comment;
  }

  async createComment(
    postId: number,
    userId: number,
    createCommentDto: CreateCommentDTO,
  ): Promise<CommentRO> {
    const { parentId, content } = createCommentDto;

    let parent: Comments;

    if (parentId) {
      parent = await this.commentsRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new CommonError({
          error: ERROR.NO_EXISTS_DATA,
          message: '존재하지 않는 부모 댓글입니다.',
        });
      }
    }
    console.log('parent : ', parentId ?? null);

    const comment = this.commentsRepository.create({
      postId,
      userId,
      content,
      parentId: parentId ?? null,
      parent,
    });

    await this.commentsRepository.save(comment);

    return comment;
  }

  async getCommentsByPostId(postId: number): Promise<CommentRO[]> {
    const comments = await this.commentsRepository.find({
      where: { postId },
      relations: ['replies', 'likes'],
      order: { createdAt: 'DESC' },
    });

    const filterComments = comments.filter(
      (comment) => comment.parentId === null,
    );

    const processComments = (comments: Comments[]): CommentRO[] => {
      return comments.map((comment) => {
        const likesCount = comment.likes?.filter((like) => like.isLike).length;

        let replies: CommentRO[] = [];
        if (comment.replies && comment.replies.length > 0) {
          replies = processComments(comment.replies);
        }

        return {
          ...comment,
          likesCount: likesCount ?? 0,
          replies,
        };
      });
    };

    console.log('filterComments : ', processComments(filterComments));
    return processComments(filterComments);
  }

  async likeComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.getCommentById(commentId);

    const like = await this.commentLikeRepository.findOne({
      where: { userId, comment: { id: commentId } },
    });

    const commentLike = this.commentLikeRepository.create({
      userId,
      isLike: !like?.isLike,
      comment,
    });

    await this.commentLikeRepository.save(commentLike);
  }

  async addLikeOrDislike(
    commentId: number,
    userId: number,
    isLike: boolean,
  ): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new CommonError({
        error: ERROR.NO_EXISTS_DATA,
        message: '해당 댓글을 찾을 수 없습니다.',
      });
    }

    let like = await this.commentLikeRepository.findOne({
      where: { comment: { id: commentId }, userId },
    });
    if (like) {
      like.isLike = isLike;
    } else {
      like = this.commentLikeRepository.create({ comment, userId, isLike });
    }
    await this.commentLikeRepository.save(like);
  }

  async removeLikeOrDislike(commentId: number, userId: number): Promise<void> {
    const like = await this.commentLikeRepository.findOne({
      where: { comment: { id: commentId }, userId },
    });
    if (like) {
      await this.commentLikeRepository.remove(like);
    }
  }

  async getLikesCount(
    commentId: number,
  ): Promise<{ likes: number; dislikes: number }> {
    const [likes, dislikes] = await Promise.all([
      this.commentLikeRepository.count({
        where: { comment: { id: commentId }, isLike: true },
      }),
      this.commentLikeRepository.count({
        where: { comment: { id: commentId }, isLike: false },
      }),
    ]);
    return { likes, dislikes };
  }
}
