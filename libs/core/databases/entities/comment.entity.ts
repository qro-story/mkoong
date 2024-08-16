import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('comments')
export class Comments extends NumberPkEntity {
  @Column({ type: 'int', nullable: false, description: '게시물 ID' })
  post_id: number;

  @Column({ type: 'int', nullable: true, description: '상위 댓글 ID' })
  parent_id?: number;

  @Column({ type: 'int', default: 0, description: '댓글을 그룹핑하기 위한 id' })
  comment_group_id: number;

  @Column({ type: 'int', nullable: false, description: '사용자 ID' })
  user_id: number;

  @Column({ type: 'text', nullable: false, description: '댓글 내용' })
  content: string;
}
