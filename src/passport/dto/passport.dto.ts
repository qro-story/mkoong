import { Property, Schema } from '@libs/core/decorators';
import { PickType } from '@nestjs/swagger';

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
