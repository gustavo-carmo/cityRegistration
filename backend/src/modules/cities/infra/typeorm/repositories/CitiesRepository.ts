import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '@modules/cities/infra/typeorm/schemas/City';
import { ObjectID } from 'mongodb';
import IFindCityDTO from '@modules/cities/dtos/IFindCityDTO';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: MongoRepository<City>;

  constructor() {
    this.ormRepository = getMongoRepository(City);
  }

  public async findById(id: ObjectID): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: {
        _id: id,
      },
    });

    return city;
  }

  public async find({ name, state_id }: IFindCityDTO): Promise<City[]> {
    const queryParams = {};

    if (name) {
      Object.assign(queryParams, { name });
    }

    if (state_id) {
      Object.assign(queryParams, { state_id });
    }

    const cities = await this.ormRepository.find({
      where: queryParams,
    });

    return cities;
  }

  public async create({ name, state_id }: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create({
      name,
      state_id,
    });

    await this.ormRepository.save(city);

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return city;
  }

  public async save(city: City): Promise<City> {
    return this.ormRepository.save(city);
  }

  public async delete(city: City): Promise<void> {
    await this.ormRepository.remove(city);
  }
}

export default CitiesRepository;
