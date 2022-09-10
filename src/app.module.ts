import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 环境配置相关
import { ConfigModule } from '@nestjs/config';
// 校验环境变量
import * as Joi from '@hapi/joi';
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
     * 默认情况下会解析根目录下的.env文件，并将其中的键值对分配给process.env的环境变量合并
     * 将合并结果存储在私有结构中，可以通过ConfigService类在任何位置访问该结构
     * ConfigModule带有一个ConfigService，它提供一个get()方法来读取所有已解析的变量，
     * 要注入ConfigService，需要在需要使用的地方先导入ConfigModule
     * 在app.module中使用了forRoot()，在其他地方使用时不需要做任何事
     */
    ConfigModule.forRoot({
      // 校验传入的环境变量是否是正确格式
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(), // 必须传
        DATABASE_PORT: Joi.number().default(5432) // 默认值
      })
    }),
    // ConfigModule.forRoot({
    //   envFilePath: '.environment', // 指定.environment文件
    //   ignoreEnvFile: true, // 忽略.env文件
    // }),
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
