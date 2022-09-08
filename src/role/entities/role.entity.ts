import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Role {
  // 主键装饰器，也会进行自增
  @PrimaryGeneratedColumn()
  id: number;

  // 列装饰器
  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}
