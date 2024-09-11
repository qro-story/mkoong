import { Controller, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/post.dto';
import { Route } from '@libs/core/decorators';
import { UserInfo } from '@libs/core/decorators/info.decorator';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';
import { PostOwnerGuard } from '@libs/core/guards/post.owner.guard';
import { CreateCommentDTO } from 'src/comments/dto/comment.dto';
import { CommentsService } from 'src/comments/comments.service';
import { ApiTags } from '@nestjs/swagger';
import { CommentListRO } from 'src/comments/dto/comment.ro';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Route({
    path: '/:postId/comment',
    method: 'POST',
    guards: [PostOwnerGuard],
    auth: true,
    summary: '게시글에 댓글 달기 ',
    transform: CommentListRO,
  })
  async commentByPostId(
    @UserInfo() user: TokenPayload,
    @Param('postId') postId: number,
    @Body() dto: CreateCommentDTO,
  ) {
    const { id: userId } = user;
    console.log('user : ', user);
    console.log('postId : ', postId);
    return this.commentsService.createComment(postId, userId, dto);
  }

  @Route({
    path: '/:postId',
    method: 'PATCH',
    guards: [PostOwnerGuard],
    auth: true,
    summary: '게시글 수정, 게시글의 수정은 작성자만이 가능하다',
  })
  async updatePost(
    @Param('postId') postId: number,
    @Body() dto: CreatePostDTO,
  ) {
    return this.postsService.updateById(+postId, dto);
  }

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
