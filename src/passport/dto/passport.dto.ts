import { Property, Schema } from '@libs/core/decorators';
import { PickType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@Schema({ allowUnknown: false })
export class PassportAuth {
  @Property({ type: 'number' })
  id?: number;

  @Property({ type: 'number' })
  user_id: number;

  @Property({ type: 'string' })
  provider: string;

  @Property({ type: 'string' })
  email: string;

  @Property({ type: 'string' })
  password: string;

  @Property({ type: 'string' })
  providerUserId: string;

  @Property({ type: 'string' })
  accessToken: string;

  @Property({ type: 'string' })
  refreshToken: string;
}

export class PassportPhoneAuthDTO {
  @Property({
    type: 'string',
    description: '인증에 필요한 핸드폰 번호 => 이후에 정규식으로 변환 예정',
  })
  phoneNumber: string;
}

export class VerifyPhoneAuthRandomNumberDTO {
  @Property({
    type: 'string',
    description: '인증에 필요한 핸드폰 번호 => 이후에 정규식으로 변환 예정',
  })
  phoneNumber: string;

  @Property({
    type: 'string',
    description: '발급 받은 인증번호',
  })
  verificationCode: string;
}

//todo 일단은 간단한 회원가입만
@Schema({ allowUnknown: false })
export class CreatePassportDto extends PickType(PassportAuth, [
  'email',
  'password',
]) {}

// @Schema({ allowUnknown: false })
// export class CreatePassportDto {
//   @Property({ type: 'string' })
//   email: string;

//   @Property({ type: 'string' })
//   password: string;
// }
@Schema()
export class SignInDto extends PickType(PassportAuth, ['email', 'password']) {}
export class RefreshTokenDto extends PickType(PassportAuth, ['refreshToken']) {}
