import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import providersRouter from '@modules/providers/infra/http/routes/providers.routes';
import categoriesRouter from '@modules/providers/infra/http/routes/categories.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/providers', providersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/profile', profileRouter);

export default routes;
