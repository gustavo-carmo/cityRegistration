import { ObjectID } from 'mongodb';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import ListCityService from './ListCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let listCitiesService: ListCityService;

describe('ListCity', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();

    listCitiesService = new ListCityService(fakeCitiesRepository);
  });

  it('should be able to list cities', async () => {
    const city1 = await fakeCitiesRepository.create({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    const city2 = await fakeCitiesRepository.create({
      name: 'Santa Catarina',
      state_id: new ObjectID('5fa19d397ebfcd1516213ec2'),
    });

    const cities = await listCitiesService.execute({});

    expect(cities).toEqual([city1, city2]);
  });
});
