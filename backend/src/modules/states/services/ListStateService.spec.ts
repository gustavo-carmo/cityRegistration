import FakeStatesRepository from '../repositories/fakes/FakeStatesRepository';
import ListStateService from './ListStateService';

let fakeStatesRepository: FakeStatesRepository;
let listStatesService: ListStateService;

describe('ListState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();

    listStatesService = new ListStateService(fakeStatesRepository);
  });

  it('should be able to list states', async () => {
    const state1 = await fakeStatesRepository.create({
      name: 'São Paulo',
      abbreviation: 'SP',
    });

    const state2 = await fakeStatesRepository.create({
      name: 'Santa Catarina',
      abbreviation: 'SC',
    });

    const states = await listStatesService.execute({});

    expect(states).toEqual([state1, state2]);
  });
});
