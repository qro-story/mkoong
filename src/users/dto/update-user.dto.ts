import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Property } from '@libs/core/decorators';
import { MBTI } from '../types/mbti.type';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateNicknameDto {
  @Property({ type: 'string', required: true })
  nickname: string;
}

export class UpdateMbtiDto {
  @Property({ type: 'string', enum: MBTI, required: true })
  mbti: string;
}
