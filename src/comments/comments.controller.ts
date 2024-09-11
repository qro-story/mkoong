import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Route } from '@libs/core/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CommentListRO } from './dto/comment.ro';
import { UserInfo } from '@libs/core/decorators/info.decorator';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';
import { Post, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/passport/strategies/jwt.strategy';

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

  @Route({
    path: '/:commentId/like',
    method: 'POST',
    auth: true,
    summary: '댓글 좋아요',
  })
  async likeComment(
    @UserInfo() user: TokenPayload,
    @Param('commentId') commentId: number,
  ) {
    const { id: userId } = user;
    return this.commentsService.likeComment(commentId, userId);
  }

  @Get(':id/likes')
  async getLikesCount(@Param('id') id: number) {
    return this.commentsService.getLikesCount(id);
  }
}
