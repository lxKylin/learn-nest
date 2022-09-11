import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('key', 'value')将自定义元数据附加到路由处理程序的能力
  @SetMetadata('key', 'value')
  getHello(): string {
    return this.appService.getHello();
  }
}
