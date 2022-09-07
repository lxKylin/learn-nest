import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType()返回的是我们传给它的类的类型，所有类型都设为可选，也继承了校验规则
export class UpdateUserDto extends PartialType(CreateUserDto) {}

/**
 * 为避免重复代码
 * yarn add @nestjs/mapped-types
 */

// import { ApiProperty } from '@nestjs/swagger';
// export class UpdateUserDto {
//   //ApiProperty是对数据类型的描述
//   @ApiProperty({ description: '用户名' })
//   readonly username?: string;
//   @ApiProperty({ description: '密码' })
//   readonly password?: string;
// }
