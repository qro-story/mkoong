import { Property } from '@libs/core/decorators';

export class CreateCommentDTO {
  @Property({
    type: 'number',
    required: false,
    description: '상위 댓글 ID',
  })
  parentId?: number;

  @Property({
    type: 'string',
    required: true,
  })
  content: string;
}
