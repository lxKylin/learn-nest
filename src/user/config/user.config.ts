import { registerAs } from '@nestjs/config';

// registerAs()会注册一个命名空间配置对象users
export default registerAs('users', () => ({
  foo: 'bar'
}));
