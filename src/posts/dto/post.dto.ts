import { Property } from '@libs/core/decorators';
import { PartialType } from '@nestjs/swagger';

export class VoteOptionDTO {
  @Property({
    type: 'number',
    required: false,
    description: '투표 선택지 ID',
    example: 1,
  })
  id?: number;

  @Property({
    type: 'string',
    description: '투표 선택지',

    example: '선택지 1',
  })
  option: string;
}

export class VotePostDTO {
  @Property({
    type: 'string',
    description: '투표 선택지',
    example: '선택지 1',
  })
  content: string;
}
export class CreateAndUpdatePostDTO {
  @Property({
    type: 'string',
    description: '제목',
    example: '제목에 대한 예시',
  })
  title: string;

  @Property({
    type: 'string',
    description: '내용',
    example: '내용에 대한 예시',
  })
  content: string;

  @Property({
    type: 'array',
    schema: VotePostDTO,
    description: '투표 선택지 목록',
    example: [{ option: '선택지 1' }, { option: '선택지 2' }],
  })
  voteOptions: VoteOptionDTO[];
}

export class UpdatePostDTO extends PartialType(CreateAndUpdatePostDTO) {}
