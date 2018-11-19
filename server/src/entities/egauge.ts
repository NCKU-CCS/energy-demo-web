
import {
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class Egauge {
  @ObjectIdColumn()
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public dataid: string;

  @Column('double')
  public powerUsage: number;

  @Column('double')
  public waterUsage: number;

  @Column('double')
  public gasUsage: number;
}
