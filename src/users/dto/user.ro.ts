import { Property } from '@libs/core/decorators';
import { MBTI } from '../types/mbti.type';

export class UserRO {
  @Property({
    type: 'number',
    description: 'user의 ID',
  })
  id: number;

  @Property({
    type: 'number',
    description: '가입한 passportAuth의 id',
  })
  passportAuthId: number;

  @Property({
    type: 'string',
    description: '유저의 nickname',
  })
  nickname: string;

  @Property({
    type: 'string',
    enum: MBTI,
    description: '유저의 MBTI',
  })
  mbti: string;
}
