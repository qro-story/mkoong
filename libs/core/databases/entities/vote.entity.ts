import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './post.entity';
import { Column } from '@libs/core/decorators/column.decorator';

@Entity()
export class Votes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    description: '투표를 받기 위한 내용',
  })
  option: string;

  @ManyToOne(() => Posts, (post) => post.votes)
  post: Posts;
}
