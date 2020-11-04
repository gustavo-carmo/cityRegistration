import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import StatesController from '../controllers/StatesController';

const statesRouter = Router();
const statesController = new StatesController();

statesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      abbreviation: Joi.string(),
    },
  }),
  statesController.index,
);
statesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      abbreviation: Joi.string().required().min(2).max(2),
    },
  }),
  statesController.create,
);
statesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      abbreviation: Joi.string().required().min(2).max(2),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  statesController.update,
);
statesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  statesController.delete,
);

export default statesRouter;
