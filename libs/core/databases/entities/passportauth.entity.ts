import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('passport_auth')
export class PassportAuth extends NumberPkEntity {
  @Column({ type: 'int', nullable: false, description: '사용자 ID' })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    description: 'Oauth 제공자 (예: Google, Facebook)',
  })
  provider: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
    description: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    description: '비밀번호',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    description: '제공자의 사용자 ID',
  })
  provider_user_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    description: '접근 토큰',
  })
  access_token: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    description: '갱신 토큰',
  })
  refresh_token: string;
}
