
import {
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class Egauge {
  @ObjectIdColumn()
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public dataid: string;

  @Column('double')
  public use: number;

  @Column('double')
  public gen: number;

  @Column('double')
  public grid: number;
}