import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import DeleteCityService from './DeleteCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let deleteCitiesService: DeleteCityService;

describe('DeleteCity', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();

    deleteCitiesService = new DeleteCityService(fakeCitiesRepository);
  });

  it('should be able to delete city', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    const city2 = await fakeCitiesRepository.create({
      name: 'Santa Catarina',
      state_id: new ObjectID('5fa19d397ebfcd1516213ec2'),
    });

    await deleteCitiesService.execute(city.id);

    const cities = await fakeCitiesRepository.find({});

    expect(cities).toEqual(expect.arrayContaining([city2]));
  });

  it('should not be able to delete an inexistent city', async () => {
    await expect(
      deleteCitiesService.execute(new ObjectID('5fa19d397ebfcd1545222cd3')),
    ).rejects.toBeInstanceOf(AppError);
  });
});
