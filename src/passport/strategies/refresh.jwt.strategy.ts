import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportService } from '../passport.service';
import { CommonError, ERROR } from '@libs/core/types';

// TODO:   refresh token 검증 후 새로운 access token 발급

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly passportService: PassportService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;

    const body = req.body;
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new CommonError({
        error: ERROR.INSUFFICIENT_PARAMS,
        message: 'body에 refreshToken이 없습니다.',
      });
    }
    return true;
  }
}
