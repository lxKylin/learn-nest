import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';
// import { User } from './user/entities/user.entity';
// import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
// import { UserRatingModule } from './user-rating/user-rating.module';

// nest中的模块装饰器
/**
 * Module有四大模块
 */
@Module({
  imports: [
    /**
     * 会解析根目录下的.env文件，并将其中的键值对分配给process.env的环境变量合并
     * 将合并结果存储在私有结构中，可以通过ConfigService类在任何位置访问该结构
     */
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // 来自process.env的每个值都是字符串，前面加+转数字
      username: process.env.DATABASE_USER_NAME, // PostgreSQL默认的设置
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
