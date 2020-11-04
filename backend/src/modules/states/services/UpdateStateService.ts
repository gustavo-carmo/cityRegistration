import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import IStatesRepository from '../repositories/IStatesRepository';

import State from '../infra/typeorm/schemas/State';

interface IRequest {
  id: ObjectID;
  name: string;
  abbreviation: string;
}

@injectable()
class UpdateStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({
    id,
    name,
    abbreviation,
  }: IRequest): Promise<State | undefined> {
    const state = await this.statesRepository.findById(id);

    if (!state) {
      throw new AppError('State not found.');
    }

    let states = await this.statesRepository.find({
      name,
    });

    const stateWithName = states.length ? states[0] : null;

    if (stateWithName && String(stateWithName.id) !== String(id)) {
      throw new AppError('State name already in use.');
    }

    states = await this.statesRepository.find({
      abbreviation,
    });

    const stateWithAbbreviation = states.length ? states[0] : null;

    if (
      stateWithAbbreviation &&
      String(stateWithAbbreviation.id) !== String(id)
    ) {
      throw new AppError('State abbreviation already in use.');
    }

    Object.assign(state, { name, abbreviation });

    await this.statesRepository.save(state);

    return state;
  }
}

export default UpdateStateService;
