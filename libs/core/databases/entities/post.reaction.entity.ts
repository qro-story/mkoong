import { Entity, ManyToOne } from 'typeorm';
import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';
import { Posts } from './post.entity';
import { Users } from './user.entity';

@Entity('post-reactions')
export class PostReactions extends NumberPkEntity {
  @ManyToOne(() => Posts, (post) => post.reactions)
  post: Posts;

  @ManyToOne(() => Users, (user) => user.reactions)
  user: Users;

  @Column({
    type: 'boolean',
    nullable: false,
    description: '좋아요 여부',
  })
  like: boolean;
}
