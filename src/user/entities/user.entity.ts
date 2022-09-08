import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
