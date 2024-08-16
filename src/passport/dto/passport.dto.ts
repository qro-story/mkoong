import { Property, Schema } from '@libs/core/decorators';

@Schema()
export class PassportAuth {
  @Property({ type: 'number', required: false })
  id?: number;

  @Property({ type: 'number', required: false })
  user_id: number;

  @Property({ type: 'string', required: false })
  provider: string;

  @Property({ type: 'string', required: false })
  email: string;

  @Property({ type: 'string', required: false })
  password: string;

  @Property({ type: 'string', required: false })
  provider_user_id: string;

  @Property({ type: 'string', required: false })
  access_token: string;

  @Property({ type: 'string', required: false })
  refresh_token: string;
}

export class CreatePassportDto extends PassportAuth {}
