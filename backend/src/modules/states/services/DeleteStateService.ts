import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import IStatesRepository from '../repositories/IStatesRepository';

@injectable()
class CreateStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute(id: ObjectID): Promise<void> {
    const state = await this.statesRepository.findById(id);

    if (!state) {
      throw new AppError('State not found.');
    }

    await this.statesRepository.delete(state);
  }
}

export default CreateStateService;
