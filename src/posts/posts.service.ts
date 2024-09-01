import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/post.dto';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';
import { Repository } from 'typeorm';
import { Posts } from '@libs/core/databases/entities/post.entity';
import { AbstractRepository } from '@libs/core/databases';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService extends AbstractRepository<Posts> {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @Inject(REQUEST) req: Request,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {
    super(postsRepository, req);
  }

  async getMyPosts(userId: number) {
    return this.postsRepository.find({
      where: {
        userId,
      },
    });
  }

  async createPosts(userId: number, dto: CreatePostDTO) {
    await this.userService.getUserById(userId);

    const post = await this.create({
      userId,
      ...dto,
    });

    return post;
  }
}
