import { Property } from '@libs/core/decorators';

export class CreateCommentDTO {
  @Property({
    type: 'number',
    required: false,
    description: '상위 댓글 ID (대댓글인 경우)',
  })
  parentId?: number;

  @Property({
    type: 'string',
    required: true,
    description: '댓글 내용',
    example: '댓글에 대한 예시',
  })
  content: string;
}

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
  })
  userId: number;

  @Property({
    type: 'number',
    description: '좋아요 개수',
  })
  likesCount?: number;

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
  })
  replies?: CommentRO[];
}
