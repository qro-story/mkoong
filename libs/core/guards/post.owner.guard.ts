import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PostsService } from 'src/posts/posts.service';
import { CommonError, ERROR } from '../types';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user as TokenPayload;

    const postId = request?.params?.postId;

    if (!postId) {
      throw new CommonError({
        error: ERROR.INSUFFICIENT_PARAMS,
        message: 'Post에 대한 Id 값을 Params로 전달해주세요',
      });
    }

    const post = await this.postsService.findById(+postId);

    if (!post) {
      throw new CommonError({
        error: ERROR.NO_EXISTS_DATA,
        message: '해당 Post를 찾을 수 없습니다.',
      });
    }

    if (post.userId !== user.id) {
      throw new CommonError({
        error: ERROR.UNAUTHORIZED,
        message: 'Post에 대한 권한이 없습니다.',
      });
    }

    return true;
  }
}
