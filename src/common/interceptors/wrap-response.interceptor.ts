// 拦截器
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
// rxjs是Promise或回调的代替品，使编写异步或回调基本代码更容易
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // 使用next.handle()在拦截器中可以调用路由处理程序的方法
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    return next.handle().pipe(map((data) => ({ data })));
  }
}
