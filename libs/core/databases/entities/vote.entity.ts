import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './post.entity';
import { Column } from '@libs/core/decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';

@Entity('votes')
export class Votes extends NumberPkEntity {
  @Column({
    type: 'text',
    nullable: false,
    description: '투표를 받기 위한 내용',
  })
  option: string;

  @Column({
    type: 'int',
    default: '0', //  default는 string 타입으로 입력되어야 가능하다.
    description: '투표 수',
  })
  voteCount: number;

  @ManyToOne(() => Posts, (post) => post.votes)
  post: Posts;
}
