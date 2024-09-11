import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from '@libs/core/databases/entities/comment.entity';
import { CreateCommentDTO, CommentRO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async createComment(
    postId: number,
    userId: number,
    createCommentDto: CreateCommentDTO,
  ): Promise<CommentRO> {
    const { parentId, content } = createCommentDto;

    const comment = this.commentsRepository.create({
      postId,
      userId,
      content,
      parentId,
      parent: parentId
        ? await this.commentsRepository.findOne({ where: { id: parentId } })
        : null,
    });

    await this.commentsRepository.save(comment);

    return this.mapCommentToDTO(comment);
  }

  async getCommentsByPostId(postId: number): Promise<CommentRO[]> {
    const comments = await this.commentsRepository.find({
      where: { postId },
      relations: {
        replies: true,
      },
      order: { createdAt: 'DESC' },
    });

    return comments.map((comment) => this.mapCommentToDTO(comment));
  }

  private mapCommentToDTO(comment: Comments): CommentRO {
    return {
      id: comment.id,
      postId: comment.postId,
      parentId: comment.parentId,
      content: comment.content,
      userId: comment.userId,
      createdAt: comment.createdAt,
      replies: comment.replies?.map((reply) => this.mapCommentToDTO(reply)),
    };
  }
}
