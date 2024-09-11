import { Entity, OneToMany, ManyToOne } from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('comments')
export class Comments extends NumberPkEntity {
  @Column({
    name: 'post_id',
    type: 'int',
    nullable: false,
    description: '게시물 ID',
  })
  postId: number;

  @Column({
    name: 'parent_id',
    type: 'int',
    nullable: true,
    description: '상위 댓글 ID',
  })
  parentId?: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
    description: '사용자 ID',
  })
  userId: number;

  @Column({ type: 'text', nullable: false, description: '댓글 내용' })
  content: string;

  @ManyToOne(() => Comments, (comment) => comment.replies)
  parent: Comments;

  @OneToMany(() => Comments, (comment) => comment.parent)
  replies: Comments[];
}
