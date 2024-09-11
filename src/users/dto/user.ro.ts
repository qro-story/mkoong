import { Property } from '@libs/core/decorators';

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
}
