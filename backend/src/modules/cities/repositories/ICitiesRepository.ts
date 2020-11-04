import { ObjectID } from 'mongodb';
import ICreateCityDTO from '../dtos/ICreateCityDTO';
import IFindCityDTO from '../dtos/IFindCityDTO';
import City from '../infra/typeorm/schemas/City';

export default interface ICitiesRepository {
  create(date: ICreateCityDTO): Promise<City>;
  findById(id: ObjectID): Promise<City | undefined>;
  find(date: IFindCityDTO): Promise<City[]>;
  save(city: City): Promise<City>;
  delete(city: City): Promise<void>;
}
