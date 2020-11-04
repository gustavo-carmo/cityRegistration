import { injectable, inject } from 'tsyringe';

import IStatesRepository from '../repositories/IStatesRepository';

import State from '../infra/typeorm/schemas/State';

interface IRequest {
  name?: string;
  abbreviation?: string;
}

@injectable()
class ListStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({ name, abbreviation }: IRequest): Promise<State[]> {
    const states = await this.statesRepository.find({ name, abbreviation });

    return states;
  }
}

export default ListStateService;
