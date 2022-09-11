import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // 获取原始响应
    // switchToHttp()可以让我们能够访问请求或响应对象
    const ctx = host.switchToHttp();
    // 返回响应
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    // express
    response
      .status(status)
      .json({ ...error, timestamp: new Date().toISOString() });
  }
}
