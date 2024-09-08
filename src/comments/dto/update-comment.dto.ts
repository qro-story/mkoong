import { PartialType } from '@nestjs/swagger';
import { CreateCommentDTO } from './comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDTO) {}
