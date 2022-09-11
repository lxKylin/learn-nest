// 守卫，用于鉴权、身份验证
// nest g guard common/guards/api-key
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // canActivate返回布尔值，表示当前请求是否被允许
  // 使用返回值控制下一步动作
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取相关传入HTTP请求的信息
    const request = context.switchToHttp().getRequest<Request>();
    // 从每个请求的请求头中获取授权
    const authHeader = request.header('Authorization');
    return authHeader == process.env.API_KEY;
  }
}
