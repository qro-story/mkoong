import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UpdateMbtiDto,
  UpdateNicknameDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { Route } from '@libs/core/decorators';
import { ApiTags } from '@nestjs/swagger';
import { UserInfo } from '@libs/core/decorators/info.decorator';
import { TokenPayload } from 'src/passport/interfaces/passport.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Route({
    path: '/setting',
    method: 'post',
    auth: true,
    summary: '약관 동의에 대한 여부 -> 추후에 없어질 예정',
  })
  updateSettings(@Param('id') id: string, @Body() settingsDto: any) {
    return this.usersService.updateSettings(+id, settingsDto);
  }

  @Route({
    path: '/nickname',
    method: 'patch',
    auth: true,
    summary: '닉네임 변경',
  })
  updateNickname(
    @UserInfo() user: TokenPayload,
    @Body() dto: UpdateNicknameDto,
  ) {
    const { id } = user;
    const { nickname } = dto;
    return this.usersService.updateNickname(+id, nickname);
  }

  @Route({
    path: '/mbti',
    method: 'patch',
    auth: true,
    summary: 'MBTI 변경',
  })
  updateMbti(@UserInfo() user: TokenPayload, @Body() dto: UpdateMbtiDto) {
    const { id } = user;
    const { mbti } = dto;
    return this.usersService.updateMbti(+id, mbti);
  }

  @Route({
    path: '/posts',
    method: 'get',
    auth: true,
    summary: '내가 작성한 글 가져오기',
  })
  getUserPosts(@UserInfo() user: TokenPayload) {
    const { id } = user;
    return this.usersService.getUserPosts(+id);
  }

  @Get(':id/selected-posts')
  getSelectedPosts(@Param('id') id: string) {
    return this.usersService.getSelectedPosts(+id);
  }

  @Post(':id/review')
  sendReview(@Param('id') id: string, @Body() reviewDto: any) {
    return this.usersService.sendReview(+id, reviewDto);
  }

  @Route({
    path: '/',
    method: 'get',
    auth: true,
    summary: '나의 개인정보 가져오기',
  })
  getMyInfo(@UserInfo() user: TokenPayload) {
    return user;
  }
}
