
import {
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class HouseState {
  @ObjectIdColumn()
  public id: string;

  @Column()
  public dataid: string;

  @Column('double')
  public powerUsage: number;

  @Column('double')
  public waterUsage: number;

  @Column('double')
  public gasUsage: number;

  @Column()
  public isAtHome: boolean;

  @CreateDateColumn()
  public createdAt: Date;
}
