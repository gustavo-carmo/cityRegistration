import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

citiesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      state_id: Joi.string(),
    },
  }),
  citiesController.index,
);
citiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      state_id: Joi.string().required(),
    },
  }),
  citiesController.create,
);
citiesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      state_id: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  citiesController.update,
);
citiesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  citiesController.delete,
);

export default citiesRouter;
