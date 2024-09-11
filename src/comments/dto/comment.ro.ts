import { Property } from '@libs/core/decorators';
import { CreateCommentDTO } from './comment.dto';

export class CommentRO extends CreateCommentDTO {
  @Property({
    type: 'number',
    required: true,
    description: '댓글 ID',
  })
  id: number;

  @Property({
    type: 'number',
    required: true,
    description: '게시글 ID',
  })
  postId: number;

  @Property({
    type: 'number',
    required: true,
    description: '작성자 ID',
    example: 1,
  })
  userId: number;

  @Property({
    type: 'date',
    required: true,
    description: '작성 일시',
  })
  createdAt: Date;

  @Property({
    type: 'array',
    schema: CommentRO,
    required: false,
    description: '대댓글 목록',
    example: '대댓글에 대한 엔티티',
  })
  replies?: CommentRO[];
}

export class CommentListRO {
  @Property({
    type: 'array',
    schema: CommentRO,
    description: '댓글 목록',
  })
  comments: CommentRO[];
}
