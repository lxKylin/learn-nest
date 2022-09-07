import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'Kylin',
      password: '123456'
    }
  ]; // 暂时作为数据库
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  create(createUserDto: CreateUserDto) {
    return `This action is by ${createUserDto.username}`;
  }

  findAll() {
    return this.users;
    // return `This action returns all user`;
  }
  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  findOne(id: number) {
    return this.users.find((item) => item.id == id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((item) => item.id == id);
    if (user) {
    }
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id == id);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }
  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
