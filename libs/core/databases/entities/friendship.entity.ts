import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('friend-ships')
export class FriendShips extends NumberPkEntity {
  @Column({ type: 'int', nullable: false, description: '사용자 ID' })
  user_id: number;

  @Column({ type: 'int', nullable: false, description: '친구 ID' })
  friend_id: number;
}
