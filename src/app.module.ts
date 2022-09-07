import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
// import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// nest中的模块装饰器
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ], // 用于引入子模块
  // 1
  controllers: [AppController],
  // 2
  providers: [AppService], // 数据来源，service层是连接数据库获取数据的
})
export class AppModule {
  // constructor(private readonly connection: Connection) {}
}
