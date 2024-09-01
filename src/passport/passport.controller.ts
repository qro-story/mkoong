import { Body, CanActivate, Controller } from '@nestjs/common';
import { PassportService } from './passport.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpMethodEnum, Route } from '@libs/core/decorators';
import {
  CreatePassportDto,
  RefreshTokenDto,
  SignInDto,
} from './dto/passport.dto';
import { RefreshTokenGuard } from './strategies/refresh.jwt.strategy';

@ApiTags('passport-auth')
@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Route({
    path: '/sign-up',
    method: HttpMethodEnum.POST,
    transactional: true,
    summary: '회원가입',
    description: '이후에 핸드폰 인증하는 작업 추가될 예정',
  })
  async singUp(@Body() createPassportDto: CreatePassportDto) {
    console.log(createPassportDto);
    return await this.passportService.singUp(createPassportDto);
  }

  @Route({
    path: '/sign-in',
    method: HttpMethodEnum.POST,
    summary: '로그인',
    description: '이후에 핸드폰 인증하는 작업 추가될 예정',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.passportService.signIn(signInDto);
  }

  @Route({
    path: '/refresh',
    method: HttpMethodEnum.POST,
    guards: [RefreshTokenGuard],
    summary: '리프레시 토큰 검증 ',
    description: '이후에 핸드폰 인증하는 작업 추가될 예정',
  })
  async refresh(@Body() refreshToken: RefreshTokenDto) {
    return refreshToken;
  }
}
