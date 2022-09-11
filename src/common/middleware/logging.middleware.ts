import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('REquest-response time'); // 计算整个请求/响应周期需要的时间
    console.log('Hi form middleware');

    res.on('finish', () => console.timeEnd('REquest-response time'));
    next();
  }
}
