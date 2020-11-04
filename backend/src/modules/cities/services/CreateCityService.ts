import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import ICitiesRepository from '../repositories/ICitiesRepository';

import City from '../infra/typeorm/schemas/City';

interface IRequest {
  name: string;
  state_id: ObjectID;
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    name,
    state_id,
  }: IRequest): Promise<City | undefined> {
    const cities = await this.citiesRepository.find({ name });
    const checkCityExists = cities.length ? cities[0] : null;

    if (checkCityExists) {
      throw new AppError('City already created.');
    }

    const city = await this.citiesRepository.create({
      name,
      state_id,
    });

    return city;
  }
}

export default CreateCityService;
