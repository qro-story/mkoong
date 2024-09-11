import { Entity, ManyToOne } from 'typeorm';
import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';
import { Comments } from './comment.entity';

@Entity('comment_likes')
export class CommentLike extends NumberPkEntity {
  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    description: '사용자 ID',
  })
  userId: number;

  @Column({
    name: 'is_like',
    type: 'boolean',
    nullable: true,
    description: '좋아요(true)',
  })
  isLike?: boolean;

  @ManyToOne(() => Comments, (comment) => comment.likes)
  comment: Comments;
}
