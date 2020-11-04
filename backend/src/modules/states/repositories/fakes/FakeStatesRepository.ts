import { ObjectID } from 'mongodb';
import ICreateStateDTO from '@modules/states/dtos/ICreateStateDTO';
import IStatesRepository from '@modules/states/repositories/IStatesRepository';

import State from '@modules/states/infra/typeorm/schemas/State';
import IFindStateDTO from '@modules/states/dtos/IFindStateDTO';

class FakeStatesRepository implements IStatesRepository {
  private states: State[] = [];

  public async create({ name, abbreviation }: ICreateStateDTO): Promise<State> {
    const state = new State();

    Object.assign(state, { id: new ObjectID(), name, abbreviation });

    this.states.push(state);

    return state;
  }

  public async findById(id: ObjectID): Promise<State | undefined> {
    return this.states.find((state) => state.id === id);
  }

  public async save(state: State): Promise<State> {
    const stateIndex = this.states.findIndex(
      (findState) => findState.id === state.id,
    );

    this.states[stateIndex] = state;

    return state;
  }

  public async delete(state: State): Promise<void> {
    const stateIndex = this.states.findIndex(
      (findState) => findState.id === state.id,
    );

    this.states.splice(stateIndex, 1);
  }

  public async find({ name, abbreviation }: IFindStateDTO): Promise<State[]> {
    return this.states.filter(
      (state) =>
        (name && state.name === name) ||
        (abbreviation && state.abbreviation === abbreviation) ||
        (!name && !abbreviation && state),
    );
  }
}

export default FakeStatesRepository;
