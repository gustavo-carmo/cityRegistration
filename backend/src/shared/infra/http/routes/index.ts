import { Router } from 'express';
import statesRouter from '@modules/states/infra/http/routes/states.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';

const routes = Router();

routes.use('/states', statesRouter);
routes.use('/cities', citiesRouter);

export default routes;
