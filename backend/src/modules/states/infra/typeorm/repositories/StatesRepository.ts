import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateStateDTO from '@modules/states/dtos/ICreateStateDTO';
import IStatesRepository from '@modules/states/repositories/IStatesRepository';

import State from '@modules/states/infra/typeorm/schemas/State';
import { ObjectID } from 'mongodb';
import IFindStateDTO from '@modules/states/dtos/IFindStateDTO';

class StatesRepository implements IStatesRepository {
  private ormRepository: MongoRepository<State>;

  constructor() {
    this.ormRepository = getMongoRepository(State);
  }

  public async findById(id: ObjectID): Promise<State | undefined> {
    const state = await this.ormRepository.findOne({
      where: {
        _id: id,
      },
    });

    return state;
  }

  public async find({ name, abbreviation }: IFindStateDTO): Promise<State[]> {
    const queryParams = {};

    if (name) {
      Object.assign(queryParams, { name });
    }

    if (abbreviation) {
      Object.assign(queryParams, { abbreviation });
    }

    const states = await this.ormRepository.find({
      where: queryParams,
    });

    return states;
  }

  public async create({ name, abbreviation }: ICreateStateDTO): Promise<State> {
    const state = this.ormRepository.create({
      name,
      abbreviation,
    });

    await this.ormRepository.save(state);

    return state;
  }

  public async findByName(name: string): Promise<State | undefined> {
    const state = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return state;
  }

  public async save(state: State): Promise<State> {
    return this.ormRepository.save(state);
  }

  public async delete(state: State): Promise<void> {
    await this.ormRepository.remove(state);
  }
}

export default StatesRepository;
