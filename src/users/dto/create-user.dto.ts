import { Property, Schema } from '@libs/core/decorators';

@Schema()
export class CreateUserDto {
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
