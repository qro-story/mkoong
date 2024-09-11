import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Route } from '@libs/core/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UserInfo } from '@libs/core/decorators/info.decorator';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Route({
    path: '/:commentId/like',
    method: 'POST',
    auth: true,
    summary: '댓글 좋아요 및 취소',
  })
  async likeComment(
    @UserInfo() user: TokenPayload,
    @Param('commentId') commentId: number,
  ) {
    const { id: userId } = user;
    return this.commentsService.toggleLikeComment(commentId, userId);
  }

  @Get(':id/likes')
  async getLikesCount(@Param('id') id: number) {
    return this.commentsService.getLikesCount(id);
  }
}
