import { Entity, OneToMany } from 'typeorm';

import { Column } from '../../decorators/column.decorator';
import { NumberPkEntity } from '../abstract.entity';
import { MBTI } from 'src/users/types/mbti.type';
import { Comments } from './comment.entity';
import { Posts } from './post.entity';
import { PostReactions } from './post.reaction.entity';

@Entity('users')
export class Users extends NumberPkEntity {
  // prettier-ignore
  @Column({name : 'passport_auth_id', type: 'int', nullable: false, description: '사용자명'})
  passportAuthId: number;

  // prettier-ignore
  @Column({ type: 'varchar', length: 50, nullable: true, description: '사용자명' })
  username: string;

  @Column({ type: 'date', description: '생년월일', nullable: true })
  birth: Date;

  // prettier-ignore
  @Column({ type: 'varchar', length: 2, description: '성별' , nullable: true})
  gender: string;

  // prettier-ignore
  @Column({ type: 'varchar', length: 50, description: 'profile의 닉네임' , nullable: true})
  nickname: string;

  // prettier-ignore
  @Column({ type: 'varchar',enum: MBTI, length: 50, description: 'profile의 닉네임' , nullable: true})
  mbti: string;

  // // prettier-ignore
  // @Column({
  //   name: 'e_i_ratio',
  //   type: 'int',
  //   nullable: true,
  //   description: 'E와 I의 비율',
  // })
  // eiRatio?: number;

  // // prettier-ignore
  // @Column({ name: 'n_s_ratio', type: 'int', nullable: true, description: 'N과 S의 비율' })
  // nsRatio?: number;

  // // prettier-ignore
  // @Column({ name: 'f_t_ratio', type: 'int', nullable: true, description: 'F와 T의 비율' })
  // ftRatio?: number;

  // // prettier-ignore
  // @Column({ name: 'p_j_ratio', type: 'int', nullable: true, description: 'P와 J의 비율' })
  // pjRatio?: number;

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => PostReactions, (reaction) => reaction.user)
  reactions: PostReactions[];
}
