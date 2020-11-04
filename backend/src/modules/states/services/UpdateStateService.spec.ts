import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import FakeStatesRepository from '../repositories/fakes/FakeStatesRepository';
import UpdateStateService from './UpdateStateService';

let fakeStatesRepository: FakeStatesRepository;
let updateStatesService: UpdateStateService;

describe('UpdateState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();

    updateStatesService = new UpdateStateService(fakeStatesRepository);
  });

  it('should be able to update state', async () => {
    const state = await fakeStatesRepository.create({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    await updateStatesService.execute({
      id: new ObjectID(state.id),
      name: 'Novo Estado',
      abbreviation: 'TT',
    });

    expect(state).toHaveProperty('id');
    expect(state.name).toBe('Novo Estado');
    expect(state.abbreviation).toBe('TT');
  });

  it('should not to be able to update an inexistent state', async () => {
    await expect(
      updateStatesService.execute({
        id: new ObjectID('5fa19d397ebfcd1545432cd3'),
        name: 'São Paulo',
        abbreviation: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update state', async () => {
    await fakeStatesRepository.create({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    const state = await fakeStatesRepository.create({
      name: 'Santa Catarina',
      abbreviation: 'SC',
    });

    await expect(
      updateStatesService.execute({
        id: new ObjectID(state.id),
        name: 'São Paulo',
        abbreviation: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateStatesService.execute({
        id: new ObjectID(state.id),
        name: 'Santa Catarina',
        abbreviation: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
