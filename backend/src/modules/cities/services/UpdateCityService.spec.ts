import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import FakeCitiesRepository from '../repositories/fakes/FakeCitiesRepository';
import UpdateCityService from './UpdateCityService';

let fakeCitiesRepository: FakeCitiesRepository;
let updateCitiesService: UpdateCityService;

describe('UpdateCity', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();

    updateCitiesService = new UpdateCityService(fakeCitiesRepository);
  });

  it('should be able to update city', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    await updateCitiesService.execute({
      id: new ObjectID(city.id),
      name: 'Novo Estado',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    expect(city).toHaveProperty('id');
    expect(city.name).toBe('Novo Estado');
  });

  it('should not to be able to update an inexistent city', async () => {
    await expect(
      updateCitiesService.execute({
        id: new ObjectID('5fa19d397ebfcd1545432cd3'),
        name: 'São Paulo',
        state_id: new ObjectID('5fa19d397ebfcd1516213ec3'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update city', async () => {
    await fakeCitiesRepository.create({
      name: 'São Paulo',
      state_id: new ObjectID('5fa19d397ebfcd1506213ed1'),
    });

    const city = await fakeCitiesRepository.create({
      name: 'Santa Catarina',
      state_id: new ObjectID('5fa19d397ebfcd1516213ec2'),
    });

    await expect(
      updateCitiesService.execute({
        id: new ObjectID(city.id),
        name: 'São Paulo',
        state_id: new ObjectID('5fa19d397ebfcd1516213ec2'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
