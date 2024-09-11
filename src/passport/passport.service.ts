import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AbstractRepository } from '@libs/core/databases';
import { PassportAuth } from '@libs/core/databases/entities/passportauth.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreatePassportDto, SignInDto } from './dto/passport.dto';
import { CommonError, ERROR } from '@libs/core/types';
import * as bcrypt from 'bcrypt'; // bcrypt 라이브러리 추가
import { TokenPayload } from './interfaces/passport.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PassportService extends AbstractRepository<PassportAuth> {
  private generateToken(
    payload: TokenPayload,
    tokenSecret: string,
    tokenExpired: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: tokenSecret,
      expiresIn: tokenExpired,
    });
  }
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    @InjectRepository(PassportAuth)
    private readonly passportAuthRepository: Repository<PassportAuth>,
    @Inject(REQUEST) private readonly req: Request,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super(passportAuthRepository, req);
  }

  /* 해당 유저가 정상적인 유저입지 검사 */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
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
        message: '이미 사용중인 계정 정보입니다. ',
      });
    }
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    createPassportDto.password = await bcrypt.hash(
      createPassportDto.password,
      salt,
    );

    const passportAuthEntity =
      this.passportAuthRepository.create(createPassportDto);

    const passportAuth =
      await this.passportAuthRepository.save(passportAuthEntity);

    const userEntity = {
      passportAuthId: passportAuth.id,
    };

    await this.usersService.createUserPassportAuth(userEntity);

    return passportAuth;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.email, signInDto.password);
    if (!user) {
      throw new CommonError({
        error: ERROR.NO_EXISTS_USER,
      });
    }
    const tokenPayload: TokenPayload = {
      id: user.id,
      // username: user.username,
      email: user.email,
    };

    const accessToken = this.generateToken(
      tokenPayload,
      this.configService.get('JWT_ACCESS_SECRET'),
      this.configService.get('JWT_ACCESS_EXPIRED'),
    );
    const refreshToken = this.generateToken(
      tokenPayload,
      this.configService.get('JWT_REFRESH_SECRET'),
      this.configService.get('JWT_REFRESH_EXPIRED'),
    );
    // TODO : refresh token 저장
    await this.passportAuthRepository.update(user.id, {
      refresh_token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
