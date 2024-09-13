import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '@libs/core/databases/entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { CommentsModule } from 'src/comments/comments.module';
import { Votes } from '@libs/core/databases/entities/vote.entity';
import { PostReactions } from '@libs/core/databases/entities/post.reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Votes, PostReactions]),
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
