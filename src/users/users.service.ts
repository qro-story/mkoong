import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@libs/core/databases/entities/user.entity';
import { AbstractRepository } from '@libs/core/databases';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PostsService } from 'src/posts/posts.service';
import { CommonError, ERROR } from '@libs/core/types';

@Injectable()
export class UsersService extends AbstractRepository<Users> {
  constructor(
    @Inject(REQUEST) req: Request,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly postsService: PostsService,
  ) {
    super(userRepository, req);
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new CommonError({
        error: ERROR.NO_EXISTS_USER,
        message: '해당 id를 갖는 user는 존재하지 않습니다. ',
      });
    }

    return user;
  }

  // passportAuthId 생성
  async createUserPassportAuth(entity: { passportAuthId: number }) {
    const user = this.userRepository.create(entity);
    return await this.userRepository.save(user);
  }

  async getUserPosts(userId: number) {
    await this.getUserById(userId);
    const posts = await this.postsService.getMyPosts(userId);

    return posts;
  }

  async updateSettings(id: number, settingsDto: any) {
    // Implement logic to update user settings
    return `Updated settings for user ${id}`;
  }

  async updateNickname(userId: number, nickname: string) {
    await this.getUserById(userId);

    const updateToUser = await this.updateById(userId, { nickname });

    return updateToUser;
  }

  async updateMbti(userId: number, mbti: string) {
    await this.getUserById(userId);

    const updateToUser = await this.updateById(userId, { mbti });

    return updateToUser;
  }

  async getSelectedPosts(id: number) {
    // Implement logic to get selected posts
    return `Retrieved selected posts for user ${id}`;
  }

  async sendReview(id: number, reviewDto: any) {
    // Implement logic to send a review
    return `Sent review for user ${id}`;
  }
}
