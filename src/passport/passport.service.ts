import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AbstractRepository } from '@libs/core/databases';
import { PassportAuth } from '@libs/core/databases/entities/passportauth.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassportDto } from './dto/passport.dto';

@Injectable()
export class PassportService extends AbstractRepository<PassportAuth> {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(PassportAuth)
    private readonly passportAuthRepository: Repository<PassportAuth>,
    @Inject(REQUEST) req: Request,
  ) {
    super(passportAuthRepository, req);
  }

  async singUp(createPassportDto: CreatePassportDto) {
    const user = await this.passportAuthRepository.findOne({
      where: {
        email: createPassportDto.email,
      },
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }
}
