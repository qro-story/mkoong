import { PartialType } from '@nestjs/swagger';
import { CreatePostDTO } from './post.dto';
import { Property } from '@libs/core/decorators';

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
