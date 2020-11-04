import { ObjectID } from 'mongodb';
import ICreateStateDTO from '../dtos/ICreateStateDTO';
import IFindStateDTO from '../dtos/IFindStateDTO';
import State from '../infra/typeorm/schemas/State';

export default interface IStatesRepository {
  create(date: ICreateStateDTO): Promise<State>;
  findById(id: ObjectID): Promise<State | undefined>;
  find(date: IFindStateDTO): Promise<State[]>;
  save(state: State): Promise<State>;
  delete(state: State): Promise<void>;
}
