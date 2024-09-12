import { Property, Schema } from '@libs/core/decorators';
import { PartialType } from '@nestjs/swagger';
import { MBTI } from '../types/mbti.type';

@Schema()
export class CreateUserDTO {
  @Property({ type: 'number' })
  passportAuthId: number;

  @Property({ type: 'string' })
  phone_number: string;

  @Property({ type: 'date' })
  birth: Date;

  @Property({ type: 'string' })
  gender: string;

  @Property({ type: 'string' })
  nickname: string;
}

export class UpdateUserDto extends PartialType(CreateUserDTO) {}

export class UpdateMbtiDTO {
  @Property({ type: 'string', enum: MBTI, required: true })
  mbti: string;
}

export class CreateAndUpdateNicknameDTO {
  @Property({ type: 'string', required: true, description: '생성할 닉네임' })
  nickname: string;
}
