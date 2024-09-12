import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {
  PhoneTokenPayload,
  TokenPayload,
} from '../interfaces/passport.interface';

// todo 테스트를 위해서 기본으로 설정
@Injectable()
export class PhoneJwtStrategy extends PassportStrategy(Strategy, 'phone') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return token; // 기본값 설정
      },
      ignoreExpiration: false,
      secretOrKey:
        configService.get('JWT_ACCESS_SECRET') || 'your_jwt_secret_key', // 비밀 키 설정
    });
  }

  async validate(payload: any) {
    // payload는 위의 JWT의 payload를 인자로 받는다.
    console.log('phone payload : ', payload);
    return {
      passportAuthId: payload.passportAuthId,
      phoneNumber: payload.phoneNumber,
    };
  }
}

@Injectable()
export class PhoneAuthGuard extends AuthGuard('phone') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const request = context.switchToHttp().getRequest();

    // request.phoneAuth로 JWT 사용자 정보를 넣습니다.
    request.phoneAuth = user;

    // 기존 request.user에 자동으로 설정되지 않도록 return null 혹은 user로 직접 지정합니다.
    return user;
  }
}
