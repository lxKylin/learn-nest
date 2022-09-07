import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 设置swagger文档标签分类
@ApiTags('用户模块')
// 使用装饰器修饰类（路由）
@Controller('user')
export class UserController {
  // 依赖注入的方式，引入service
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '添加用户' // 接口描述信息
  })
  // @Body是指获取到（http请求）客户端传递过来的body体中的数据，将数据给createUserDto这个变量，CreateUserDto是TS类型约束
  // createUserDto可自定义
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginations) {
    // const { limit, offset } = paginations;
    // return `This action returns all user Limit:${limit}, offset:${offset}`;
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
