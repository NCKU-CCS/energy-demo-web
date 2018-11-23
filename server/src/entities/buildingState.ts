
import {
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export default class BuildingState {
  @ObjectIdColumn()
  public id: string;

  @Column()
  public buildingID: string;

  @Column()
  public powerUsageLevel: number;

  @CreateDateColumn()
  public createdAt: Date;
}
