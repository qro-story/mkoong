import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/passport.interface';

// todo 테스트를 위해서 기본으로 설정
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return (
          token ||
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdHJpbmciLCJpYXQiOjE3MjYwMjU3ODIsImV4cCI6MTcyNjA0NzM4Mn0.IIVeR0NiOKAjpDhm4NsDN_Y-bw8BrANqRejbBNaNpNQ'
        ); // 기본값 설정
      },
      ignoreExpiration: false,
      secretOrKey:
        configService.get('JWT_ACCESS_SECRET') || 'your_jwt_secret_key', // 비밀 키 설정
    });
  }

  async validate(payload: TokenPayload) {
    // payload는 위의 JWT의 payload를 인자로 받는다.
    console.log('payload', payload);
    return { id: payload.id, email: payload.email };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
