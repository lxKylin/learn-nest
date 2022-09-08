import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Role } from '@/role/entities/role.entity';

// @Entity()装饰器自动从所有类生成一个SQL表，以及他们包含的元数据
// @Entity('users') // sql表名为users
@Entity() // sql表名为user
export class User {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column()
  username: string;

  // @Column('json', { nullable: true }) json格式且可为空
  @Column()
  password: string;

  // @Column('json', { nullable: true })
  // 定义与其他表的关系
  @JoinTable()
  // 指定多对多关系
  /**
   * 关系类型，返回相关实体引用
   * cascade: true，插入和更新启用级联，也可设置为仅插入或仅更新
   * ['insert']
   */
  @ManyToMany((type) => Role, (role) => role.users, { cascade: true })
  roles: Role[];
  // role: string[];
}
