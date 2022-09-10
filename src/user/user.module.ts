import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { User } from './entities/user.entity';
import { Role } from '@/role/entities/role.entity';
import { Event } from '@/events/entities/event.entity';

import { USER_ROLE } from '@/common/common.constants';

// class MockUserService {}
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Event])],
  controllers: [UserController],
  // 完整写法
  // providers: [
  //   {
  //     provide: UserService,
  //     useClass: UserService
  //   }
  // ],
  // 简写版
  // providers: [UserService],
  // 1 自定义提供者可使用 useValue，可在Nest容器中添加外部库
  // 演示使用Mock
  // providers: [{provide:UserService, useValue: new MockUserService()}],
  providers: [
    UserService,
    // { provide: USER_ROLE, useValue: ['admin', 'root'] },
    { provide: USER_ROLE, useFactory: () => ['admin', 'root'] },
    // 2
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV == 'development'
          ? DevelopmentConfigService
          : ProductionConfigService
    }
  ],
  exports: [UserService] // exports后其他任何导入user.module的模块都可以访问UserService
})
export class UserModule {}
