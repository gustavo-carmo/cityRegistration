import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import FakeStatesRepository from '../repositories/fakes/FakeStatesRepository';
import DeleteStateService from './DeleteStateService';

let fakeStatesRepository: FakeStatesRepository;
let deleteStatesService: DeleteStateService;

describe('DeleteState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();

    deleteStatesService = new DeleteStateService(fakeStatesRepository);
  });

  it('should be able to delete state', async () => {
    const state = await fakeStatesRepository.create({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    const state2 = await fakeStatesRepository.create({
      name: 'Santa Catarina',
      abbreviation: 'SC',
    });

    await deleteStatesService.execute(state.id);

    const states = await fakeStatesRepository.find({});

    expect(states).toEqual(expect.arrayContaining([state2]));
  });

  it('should not be able to delete an inexistent state', async () => {
    await expect(
      deleteStatesService.execute(new ObjectID('5fa19d397ebfcd1545222cd3')),
    ).rejects.toBeInstanceOf(AppError);
  });
});
