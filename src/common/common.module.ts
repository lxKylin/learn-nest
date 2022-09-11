import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }]
})

// 引入中间件
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 将中间件绑定到所有路由
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // 将中间件绑定到排除user为前缀的所有路由
    // consumer.apply(LoggingMiddleware).exclude('user').forRoutes('*');
    // 将中间件绑定到以user为前缀的路由
    // consumer.apply(LoggingMiddleware).forRoutes('user');
    // 将中间件绑定到以user为前缀且方法为GET的路由
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
