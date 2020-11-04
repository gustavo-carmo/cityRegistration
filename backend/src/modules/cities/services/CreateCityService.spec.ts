import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import CreateCityService from './CreateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let createCitiesService: CreateCityService;

describe('CreateCity', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();

    createCitiesService = new CreateCityService(fakeCitiesRepository);
  });

  it('should be able to create a new city', async () => {
    const city = await createCitiesService.execute({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create two cities with same name', async () => {
    await createCitiesService.execute({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    await expect(
      createCitiesService.execute({
        name: 'São Paulo',
        state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
