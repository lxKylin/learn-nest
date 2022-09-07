import { ApiProperty } from '@nestjs/swagger';

// 自己设置类型
export class CreateUserDto {
  //ApiProperty是对数据类型的描述
  @ApiProperty({ description: '用户名', default: 'Kylin' })
  username: string;
  @ApiProperty({ description: '用户名', default: 'siJue' })
  password: string;
}
