import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '@/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)将自动生成的user存储库注入到userService
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const roles = await Promise.all(
      createUserDto.roles.map((name) => this.preloadRoleByName(name))
    );

    const user = this.userRepository.create({ ...createUserDto, roles });
    return this.userRepository.save(user);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      // 新的方式
      relations: {
        roles: true
      },
      skip: offset,
      take: limit
    });
  }

  async findOne(id: number) {
    // findOne(id)方法已被删除
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { roles: true }
    });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 因为更新的每个项都是可选的，所以需要确保role一定存在
    const roles =
      updateUserDto.roles &&
      (await Promise.all(
        updateUserDto.roles.map((name) => this.preloadRoleByName(name))
      ));

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      roles
    });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.userRepository.remove(user);

    // return this.userRepository.delete(id); // 可以删
  }

  // 私有方法，将角色名作为入参并返回
  private async preloadRoleByName(name: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { name } });
    if (existingRole) {
      return existingRole;
    }
    return this.roleRepository.create({ name });
  }
}
