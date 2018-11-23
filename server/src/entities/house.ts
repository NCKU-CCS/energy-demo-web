
import {
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity()
export default class House {
  @ObjectIdColumn()
  public id: string;

  @PrimaryColumn()
  public houseID: string;

  @Column('double')
  public lat: number;

  @Column('double')
  public lng: number;
}
