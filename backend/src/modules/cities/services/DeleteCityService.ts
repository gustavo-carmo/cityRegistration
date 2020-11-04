import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(id: ObjectID): Promise<void> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('City not found.');
    }

    await this.citiesRepository.delete(city);
  }
}

export default CreateCityService;
