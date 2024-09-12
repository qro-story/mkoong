import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from '@libs/core/databases/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { PassportModule } from 'src/passport/passport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => PostsModule),
    forwardRef(() => PassportModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
