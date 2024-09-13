import { PartialType } from '@nestjs/swagger';
import { CreatePostDTO } from './post.dto';
import { Property } from '@libs/core/decorators';
import { UserRO } from 'src/users/dto/user.ro';

export class PostVotesRO {
  @Property({
    type: 'number',
    description: '투표 pk',
  })
  id: number;

  @Property({
    type: 'string',
    description: '투표의 내용',
  })
  option: string;

  @Property({
    type: 'number',
    description: '투표 수',
  })
  voteCount: number;
}
export class PostRO {
  @Property({
    type: 'number',
    description: '게시글 pk',
  })
  id: number;

  @Property({
    type: 'number',
    description: '사용자 id',
  })
  userId: number;

  @Property({
    type: 'string',
    description: '제목',
  })
  title: string;

  @Property({
    type: 'string',
    description: '내용',
  })
  content: string;

  @Property({ type: UserRO, description: '해당 post를 작성한 user의 정보' })
  user: UserRO;

  @Property({
    type: 'array',
    schema: PostVotesRO,
    description: '해당 post의 투표 정보',
  })
  votes: PostVotesRO;

  @Property({
    type: 'date',
    description: '생성일',
  })
  createdAt: Date;

  @Property({
    type: 'date',
    description: '수정일',
  })
  updatedAt: Date;
}
