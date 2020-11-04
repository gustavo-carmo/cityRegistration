import { injectable, inject } from 'tsyringe';

import { ObjectID } from 'mongodb';
import ICitiesRepository from '../repositories/ICitiesRepository';

import City from '../infra/typeorm/schemas/City';

interface IRequest {
  name?: string;
  state_id?: ObjectID;
}

@injectable()
class ListCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name, state_id }: IRequest): Promise<City[]> {
    const cities = await this.citiesRepository.find({ name, state_id });

    return cities;
  }
}

export default ListCityService;
