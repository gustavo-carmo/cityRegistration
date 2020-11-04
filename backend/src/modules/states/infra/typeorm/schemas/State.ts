import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('states')
class State {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  name: string;

  @Column('varchar')
  abbreviation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default State;
