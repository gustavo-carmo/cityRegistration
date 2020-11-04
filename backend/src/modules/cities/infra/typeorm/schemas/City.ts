import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import State from '@modules/states/infra/typeorm/schemas/State';

@Entity('cities')
class City {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  name: string;

  @Column('varchar')
  state_id: ObjectID;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default City;
