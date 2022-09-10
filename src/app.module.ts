import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { UserRatingModule } from './user-rating/user-rating.module';

// nest中的模块装饰器
/**
 * Module有四大模块
 */
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // PostgreSQL默认的设置
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // 自动加载模块
      // entities: [User],
      synchronize: true // 开启同步，生产中要禁止
    }),
    RoleModule
  ], // 用于引入子模块
  // 1
  controllers: [AppController],
  // 2
  providers: [AppService] // 数据来源，service层是连接数据库获取数据的
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
