import { Property } from '@libs/core/decorators';
import { PartialType } from '@nestjs/swagger';

export class CreatePostDTO {
  @Property({
    type: 'string',
    description: '제목',
    example: '제목에 대한 예시',
  })
  title: string;

  @Property({
    type: 'string',
    description: '제목',
    example: '내용에 대한 예시',
  })
  content: string;
}

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
