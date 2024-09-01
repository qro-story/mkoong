import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { Route } from '@libs/core/decorators';
import { UserInfo } from '@libs/core/decorators/info.decorator';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Route({
    path: '/',
    method: 'POST',
    auth: true,
    summary: '게시글 생성',
  })
  async create(@UserInfo() user: TokenPayload, @Body() dto: CreatePostDTO) {
    const { id: userId } = user;

    return this.postsService.createPosts(userId, dto);
  }
}
