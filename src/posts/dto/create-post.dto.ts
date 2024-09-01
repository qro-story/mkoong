import { Property } from '@libs/core/decorators';

export class CreatePostDTO {
  @Property({
    type: 'string',
    description: '제목',
  })
  title: string;

  @Property({
    type: 'string',
    description: '제목',
  })
  content: string;
}
