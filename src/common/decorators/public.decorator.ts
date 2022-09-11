import { SetMetadata } from '@nestjs/common';

// 作为元数据的key
export const IS_PUBLIC_KEY = 'isPublic';

// 自定义装饰器
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
