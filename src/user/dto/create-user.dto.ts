import { ApiProperty } from '@nestjs/swagger';
// 校验规则
import { IsString } from 'class-validator';

// DTO用于定义系统内的接口或者输入和输出
export class CreateUserDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '用户名', default: 'Kylin' })
  @IsString()
  readonly username: string;
  @ApiProperty({ description: '密码', default: 'siJue' })
  @IsString()
  readonly password: string;
}
