import { PartialType } from '@nestjs/swagger';
import { CreatePassportDto } from './passport.dto';
import { Property } from '@libs/core/decorators';

export class UpdatePassportDto extends PartialType(CreatePassportDto) {}

export class PhoneAuthRO {
  @Property({
    type: 'string',
    description: '성공 메시지',
  })
  message: string;
  @Property({
    type: 'string',
    description: '핸드폰 번호로 인증한 jwt token',
  })
  accessToken: string;
}
