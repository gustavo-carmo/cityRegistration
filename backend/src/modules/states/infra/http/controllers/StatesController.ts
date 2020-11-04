import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListStateService from '@modules/states/services/ListStateService';
import CreateStateService from '@modules/states/services/CreateStateService';
import UpdateStateService from '@modules/states/services/UpdateStateService';
import DeleteStateService from '@modules/states/services/DeleteStateService';

import { ObjectID } from 'mongodb';

export default class StatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, abbreviation } = request.query;

    const listStateService = container.resolve(ListStateService);

    const states = await listStateService.execute({
      ...(name ? { name: String(name) } : {}),
      ...(abbreviation ? { abbreviation: String(abbreviation) } : {}),
    });

    return response.json(states);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, abbreviation } = request.body;

    const createStateService = container.resolve(CreateStateService);

    const state = await createStateService.execute({ name, abbreviation });

    return response.json(state);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, abbreviation } = request.body;

    const updateStateService = container.resolve(UpdateStateService);

    const state = await updateStateService.execute({
      id: new ObjectID(id),
      name,
      abbreviation,
    });

    return response.json(state);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStateService = container.resolve(DeleteStateService);

    await deleteStateService.execute(new ObjectID(id));

    return response.status(204).json();
  }
}
