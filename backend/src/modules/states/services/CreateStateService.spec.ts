import AppError from '@shared/errors/AppError';
import FakeStatesRepository from '../repositories/fakes/FakeStatesRepository';
import CreateStateService from './CreateStateService';

let fakeStatesRepository: FakeStatesRepository;
let createStatesService: CreateStateService;

describe('CreateState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();

    createStatesService = new CreateStateService(fakeStatesRepository);
  });

  it('should be able to create a new state', async () => {
    const state = await createStatesService.execute({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    expect(state).toHaveProperty('id');
  });

  it('should not be able to create two states with same name', async () => {
    await createStatesService.execute({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    await expect(
      createStatesService.execute({
        name: 'São Paulo',
        abbreviation: 'SC',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two states with same name', async () => {
    await createStatesService.execute({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    await expect(
      createStatesService.execute({
        name: 'Santa Catarina',
        abbreviation: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
