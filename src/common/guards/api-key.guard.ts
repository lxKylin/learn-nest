// 守卫，用于鉴权、身份验证
// nest g guard common/guards/api-key
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // 为测试API_KEY是否存在需要访问元数据
  // Reflector类允许在特定上下文中检索元数据
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) {}
  // canActivate返回布尔值，表示当前请求是否被允许
  // 使用返回值控制下一步动作
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**
     * IS_PUBLIC_KEY，根据key查找元数据
     * 第二参数：目标对象上下文
     */
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // 如果路由是公共的那么可以跳过
    if (isPublic) {
      return true;
    }
    // 获取相关传入HTTP请求的信息
    const request = context.switchToHttp().getRequest<Request>();
    // 从每个请求的请求头中获取授权
    const authHeader = request.header('Authorization');
    // 不应该直接使用process.env，改用ConfigService
    return authHeader == this.configService.get('API_KEY');
    // return authHeader == process.env.API_KEY;
  }
}
