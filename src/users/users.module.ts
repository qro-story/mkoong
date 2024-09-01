import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from '@libs/core/databases/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { Posts } from '@libs/core/databases/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => PostsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
