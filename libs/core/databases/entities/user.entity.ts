import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity()
export class User extends NumberPkEntity {
  // prettier-ignore
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false, description: '사용자명' })
  username: string;

  // prettier-ignore
  @Column({ type: 'varchar', length: 20, unique: true, description: '핸드폰 번호', })
  phone_number: string;

  @Column({ type: 'date', description: '생년월일' })
  birth: Date;

  @Column({ type: 'varchar', length: 2, description: '성별' })
  gender: string;

  @Column({ type: 'varchar', length: 50, description: 'profile의 닉네임' })
  nickname: string;

  @Column({ type: 'int', nullable: true, description: 'E와 I의 비율' })
  e_i_ratio: number;

  @Column({ type: 'int', nullable: true, description: 'N과 S의 비율' })
  n_s_ratio: number;

  @Column({ type: 'int', nullable: true, description: 'F와 T의 비율' })
  f_t_ratio: number;

  @Column({ type: 'int', nullable: true, description: 'P와 J의 비율' })
  p_j_ratio: number;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
