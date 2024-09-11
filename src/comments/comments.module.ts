import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '@libs/core/databases/entities/comment.entity';
import { CommentLike } from '@libs/core/databases/entities/comment.like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, CommentLike])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
