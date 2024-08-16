import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Route } from '@libs/core/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Route({
    path: '/',
    method: 'POST',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
