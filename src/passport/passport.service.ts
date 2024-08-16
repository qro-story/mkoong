import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AbstractRepository } from '@libs/core/databases';
import { PassportAuth } from '@libs/core/databases/entities/passportauth.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassportDto } from './dto/passport.dto';
import { CommonError, ERROR } from '@libs/core/types';
import * as bcrypt from 'bcrypt'; // bcrypt 라이브러리 추가

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
    if (user) {
      throw new CommonError({
        error: ERROR.ALREADY_USED_DATA,
      });
    }
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    createPassportDto.password = await bcrypt.hash(
      createPassportDto.password,
      salt,
    );

    return await this.passportAuthRepository.save(createPassportDto);
    // todo 이후에 비밀번호 암호화 해야함
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
