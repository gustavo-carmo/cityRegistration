import { ObjectID } from 'mongodb';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '@modules/cities/infra/typeorm/schemas/City';
import IFindCityDTO from '@modules/cities/dtos/IFindCityDTO';

class FakeCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async create({ name, state_id }: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: new ObjectID(), name, state_id });

    this.cities.push(city);

    return city;
  }

  public async findById(id: ObjectID): Promise<City | undefined> {
    return this.cities.find((city) => city.id === id);
  }

  public async save(city: City): Promise<City> {
    const cityIndex = this.cities.findIndex(
      (findCity) => findCity.id === city.id,
    );

    this.cities[cityIndex] = city;

    return city;
  }

  public async delete(city: City): Promise<void> {
    const cityIndex = this.cities.findIndex(
      (findCity) => findCity.id === city.id,
    );

    this.cities.splice(cityIndex, 1);
  }

  public async find({ name, state_id }: IFindCityDTO): Promise<City[]> {
    return this.cities.filter(
      (city) =>
        (name && city.name === name) ||
        (state_id && city.state_id === state_id) ||
        (!name && !state_id && city),
    );
  }
}

export default FakeCitiesRepository;
