import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return `This action is by ${createUserDto.username}`;
  }

  // findAll() {
  //   return `This action returns all user`;
  // }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
