import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpMethodEnum, Route } from '@libs/core/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Route({
    path: '/',
    method: HttpMethodEnum.GET,
    summary: '서버 테스트',
  })
  postHello(): string {
    return this.appService.getHello();
  }
}
