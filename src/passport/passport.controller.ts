import { Body, Controller } from '@nestjs/common';
import { PassportService } from './passport.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpMethodEnum, Route } from '@libs/core/decorators';
import { CreatePassportDto } from './dto/passport.dto';

@ApiTags('passport-auth')
@Controller('passport')
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Route({
    path: '/signup',
    method: HttpMethodEnum.POST,
  })
  async singUp(@Body() createPassportDto: CreatePassportDto) {
    return await this.passportService.singUp(createPassportDto);
  }
}
