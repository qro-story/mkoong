import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@libs/core/databases/entities/user.entity';
import { AbstractRepository } from '@libs/core/databases';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UsersService extends AbstractRepository<Users> {
  constructor(
    @InjectRepository(Users) userRepository: Repository<Users>,
    @Inject(REQUEST) req: Request,
  ) {
    super(userRepository, req);
  }

  async updateSettings(id: number, settingsDto: any) {
    // Implement logic to update user settings
    return `Updated settings for user ${id}`;
  }

  async updateNickname(id: number, nickname: string) {
    // Implement logic to update user nickname
    return `Updated nickname for user ${id} to ${nickname}`;
  }

  async updateMbti(id: number, mbti: string) {
    // Implement logic to update user MBTI
    return `Updated MBTI for user ${id} to ${mbti}`;
  }

  async getUserPosts(id: number) {
    // Implement logic to get user posts
    return `Retrieved posts for user ${id}`;
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
