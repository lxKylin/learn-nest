import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { USER_ROLE } from '@/common/common.constants';

import { User } from './entities/user.entity';
import { Role } from '@/role/entities/role.entity';
import { Event } from '@/events/entities/event.entity';

/**
 * 依赖注入有三个关键步骤
 * 1、由@Injectable()装饰器声明一个可以由Nest容器管理的类
 * @Injectable()装饰器将其标记为 提供者
 * 2、控制器会请求这里的方法，这个请求告诉Nest将提供程序注入到控制器中
 * 3、Nest知道this类也是一个提供者
 */
@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)将自动生成的user存储库注入到userService
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    // 使用connection来创建事物
    // Connection被重命名为DataSource
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    // 注入自定义提供程序使用的
    @Inject(USER_ROLE) userRole: string[]
  ) {
    console.log(userRole, 'userRole'); // test
    const dataBaseHost = this.configService.get<string>('DATABASE_HOST');
    console.log(dataBaseHost, 'dataBaseHost'); // test
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

  async create(createUserDto: CreateUserDto) {
    const roles = await Promise.all(
      createUserDto.roles.map((name) => this.preloadRoleByName(name))
    );

    const user = this.userRepository.create({ ...createUserDto, roles });
    return this.userRepository.save(user);
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
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.userRepository.remove(user);

    // return this.userRepository.delete(id); // 可以删
  }

  async recommendUser(user: User) {
    const queryRunner = this.dataSource.createQueryRunner();

    // 建立一个和数据库新的连接
    await queryRunner.connect();
    // 开始交易
    await queryRunner.startTransaction();

    // 事务代码包裹在try/catch/finally中
    try {
      user.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_user';
      recommendEvent.type = 'user';
      recommendEvent.payload = { userId: user.id };

      await queryRunner.manager.save(user);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      // 回滚
      await queryRunner.rollbackTransaction();
    } finally {
      // 一切完成后释放或关闭queryRunner
      await queryRunner.release();
    }
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
