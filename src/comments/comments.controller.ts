import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentRO } from './dto/comment.dto';
import { Route } from '@libs/core/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CommentListRO } from './dto/comment.ro';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Route({
    path: '/post/:postId',
    method: 'GET',
    summary: '특정 게시글에 달린 댓글과 대댓글 가져오기',
    transform: CommentListRO,
  })
  async getCommentsByPostId(
    @Param('postId') postId: number,
  ): Promise<CommentListRO> {
    const comments = await this.commentsService.getCommentsByPostId(postId);
    return { comments };
  }
}
