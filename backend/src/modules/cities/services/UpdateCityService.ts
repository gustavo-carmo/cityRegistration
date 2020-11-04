import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import ICitiesRepository from '../repositories/ICitiesRepository';

import City from '../infra/typeorm/schemas/City';

interface IRequest {
  id: ObjectID;
  name: string;
  state_id: ObjectID;
}

@injectable()
class UpdateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    id,
    name,
    state_id,
  }: IRequest): Promise<City | undefined> {
    const city = await this.citiesRepository.findById(id);

    if (!city) {
      throw new AppError('City not found.');
    }

    const cities = await this.citiesRepository.find({
      name,
    });

    const cityWithName = cities.length ? cities[0] : null;

    if (cityWithName && String(cityWithName.id) !== String(id)) {
      throw new AppError('City name already in use.');
    }

    Object.assign(city, { name, state_id });

    await this.citiesRepository.save(city);

    return city;
  }
}

export default UpdateCityService;
