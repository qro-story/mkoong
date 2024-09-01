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
  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    description: '사용자 ID',
  })
  userId: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
    description: '제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: false,
    description: '내용',
  })
  content: string;
}
