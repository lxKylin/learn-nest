import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// 定义包含多个索引
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // 定义索引 帮助加快搜索速度
  // @Index()
  @Column()
  name: string;

  @Column('json')
  // 有效负载，它是我们可以存储 事件 的有效负载的通用列
  payload: Record<string, any>;
}
