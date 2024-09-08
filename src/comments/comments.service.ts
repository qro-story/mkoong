import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '@libs/core/databases/entities/comment.entity';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@libs/core/databases';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { group } from 'console';

@Injectable()
export class CommentsService extends AbstractRepository<Comments> {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    @Inject(REQUEST)
    private readonly req: Request,
  ) {
    super(commentsRepository, req);
  }
  async createComment(userId: number, dto: CreateCommentDTO) {
    // note: 해당 commet에 대한 groupid가 있는 지 판단

    let groupId: number;

    if (dto.parentId) {
      const parentComment = await this.commentsRepository.findOne({
        where: { id: dto.parentId },
      });
      if (parentComment) {
        // 만약 상위댓글이 있다면 상위댓글의 groupid를 가져온다.
        groupId = parentComment.groupId;
      } else {
      }
    }

    return this.create(dto);
  }
}
