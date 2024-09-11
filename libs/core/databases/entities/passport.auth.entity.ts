import { Entity } from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';
import { Property } from '@libs/core/decorators';

@Entity('passport_auth')
export class PassportAuth extends NumberPkEntity {
  @Column({ type: 'int', nullable: true, description: '사용자 ID' })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
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

  // prettier-ignore
  @Column({ name: 'phone_number', type: 'varchar', length: 20, description: '핸드폰 번호',  nullable: true})
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    description: '비밀번호',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 60, // bcrypt 해시의 길이에 맞춰 조정
    nullable: true,
    description: '인증에 사용되는 검증 번호 (암호화됨)',
  })
  verificationCode?: string;

  @Column({
    type: 'date',
    nullable: true,
    description: ' 인증 만료 시간 ',
  })
  verificationExpires?: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    description: '갱신 토큰',
  })
  refresh_token: string;

  @Column({
    type: 'date',
    nullable: true,
    description: '핸드폰 인증 성공 날짜',
  })
  verifiedAt?: Date;
}
