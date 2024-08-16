import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';
import { REACTION_TYPE } from '@libs/core/constants/enums';

@Entity('post-reactions')
export class PostReactions extends NumberPkEntity {
  @Column({ type: 'int', description: '게시물 ID' })
  post_id: number;

  @Column({ type: 'int', description: '사용자 ID' })
  user_id: number;

  @Column({
    type: 'string',
    enum: REACTION_TYPE,
    nullable: false,
    description: '반응 유형',
  })
  reaction_type: REACTION_TYPE;
}
