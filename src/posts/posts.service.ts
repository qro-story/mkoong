import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/post.dto';
import { Repository } from 'typeorm';
import { Posts } from '@libs/core/databases/entities/post.entity';
import { AbstractRepository } from '@libs/core/databases';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { Votes } from '@libs/core/databases/entities/vote.entity';

@Injectable()
export class PostsService extends AbstractRepository<Posts> {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Votes)
    private readonly votesRepository: Repository<Votes>,
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
    const user = await this.userService.getUserById(userId);

    const { title, content, voteOptions } = dto;
    console.log('voteOptions : ', typeof voteOptions);

    const post = this.postsRepository.create({
      userId,
      content,
      title,
      user,
    });

    // 투표 옵션 생성
    if (voteOptions && voteOptions.length > 0) {
      post.votes = voteOptions!.map((voteOption) =>
        this.votesRepository.create({
          option: voteOption.option,
          post,
        }),
      );
    }

    await this.postsRepository.save(post);

    console.log(post);
    return post;
  }
}
