import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)将自动生成的user存储库注入到userService
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id) {
    console.log(id);
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.userRepository.remove(user);

    // return this.userRepository.delete(id); // 可以删
  }
}
