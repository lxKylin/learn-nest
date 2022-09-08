import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // 创建nest应用 （引入根模块）
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  // 启动全局字段校验，保证请求接口字段校验正确
  // 对传入客户端的值强制执行验证规则
  // 需要装两个依赖 yarn add class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        // 全局启用隐式转换，不再需要使用@Type()装饰器指定类型
        enableImplicitConversion: true
      }
    })
  );

  // 创建swagger接口文档
  const options = new DocumentBuilder()
    .setTitle('接口文档') // 标题
    .setDescription('The cats API description') // 描述
    .setVersion('1.0') // 版本
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document); // 第一个参数是接口文档地址

  await app.listen(9527, () => {
    console.log(`项目运行在http:localhost:9527/api`);
  });
}
bootstrap();
