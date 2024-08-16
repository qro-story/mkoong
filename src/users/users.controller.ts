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
import { UpdateUserDto } from './dto/update-user.dto';
import { Route } from '@libs/core/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Route({
    path: '/:id/setting',
    method: 'post',
    description: '약관 동의에 대한 여부 -> 추후에 없어질 예정',
  })
  updateSettings(@Param('id') id: string, @Body() settingsDto: any) {
    return this.usersService.updateSettings(+id, settingsDto);
  }

  @Patch(':id/nickname')
  updateNickname(@Param('id') id: string, @Body('nickname') nickname: string) {
    return this.usersService.updateNickname(+id, nickname);
  }

  @Patch(':id/mbti')
  updateMbti(@Param('id') id: string, @Body('mbti') mbti: string) {
    return this.usersService.updateMbti(+id, mbti);
  }

  @Get(':id/posts')
  getUserPosts(@Param('id') id: string) {
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
}
