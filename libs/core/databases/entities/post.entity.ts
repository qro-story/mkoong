import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('posts')
export class Posts extends NumberPkEntity {
  @Column({ type: 'int', nullable: false, description: '사용자 ID' })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    description: '제목',
  })
  title: string;

  @Column({ type: 'text', nullable: false, description: '내용' })
  content: string;
}
