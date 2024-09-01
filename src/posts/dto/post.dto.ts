import { Property } from '@libs/core/decorators';
import { PartialType } from '@nestjs/swagger';

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

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
