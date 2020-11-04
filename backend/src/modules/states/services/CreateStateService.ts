import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStatesRepository from '../repositories/IStatesRepository';

import State from '../infra/typeorm/schemas/State';

interface IRequest {
  name: string;
  abbreviation: string;
}

@injectable()
class CreateStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({
    name,
    abbreviation,
  }: IRequest): Promise<State | undefined> {
    let states = await this.statesRepository.find({ name });
    let checkStateExists = states.length ? states[0] : null;

    if (checkStateExists) {
      throw new AppError('State already created.');
    }

    states = await this.statesRepository.find({ abbreviation });
    checkStateExists = states.length ? states[0] : null;

    if (checkStateExists) {
      throw new AppError('State already created.');
    }

    const state = await this.statesRepository.create({
      name,
      abbreviation,
    });

    return state;
  }
}

export default CreateStateService;
