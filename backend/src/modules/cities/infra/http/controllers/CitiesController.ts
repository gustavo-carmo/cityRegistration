import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCityService from '@modules/cities/services/ListCityService';
import CreateCityService from '@modules/cities/services/CreateCityService';
import UpdateCityService from '@modules/cities/services/UpdateCityService';
import DeleteCityService from '@modules/cities/services/DeleteCityService';

import { ObjectID } from 'mongodb';

export default class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, state_id } = request.query;

    const listCityService = container.resolve(ListCityService);

    const cities = await listCityService.execute({
      ...(name ? { name: String(name) } : {}),
      ...(state_id ? { state_id: new ObjectID(state_id as string) } : {}),
    });

    return response.json(cities);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, state_id } = request.body;

    const createCityService = container.resolve(CreateCityService);

    const city = await createCityService.execute({ name, state_id });

    return response.json(city);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, state_id } = request.body;

    const updateCityService = container.resolve(UpdateCityService);

    const city = await updateCityService.execute({
      id: new ObjectID(id),
      name,
      state_id: new ObjectID(state_id),
    });

    return response.json(city);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCityService = container.resolve(DeleteCityService);

    await deleteCityService.execute(new ObjectID(id));

    return response.status(204).json();
  }
}
