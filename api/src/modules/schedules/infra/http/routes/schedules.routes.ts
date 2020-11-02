import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderSchedulesController from '../controllers/ProviderSchedulesController';
import SchedulesController from '../controllers/SchedulesController';
import UserSchedulesController from '../controllers/UserSchedulesController';

const schedulesRouter = Router();
const schedulesController = new SchedulesController();
const userSchedulesController = new UserSchedulesController();
const providerSchedulesController = new ProviderSchedulesController();

schedulesRouter.use(ensureAuthenticated);

schedulesRouter.post('/', schedulesController.create);
schedulesRouter.get('/show/:schedule_id', schedulesController.show);
schedulesRouter.get('/me', userSchedulesController.index);
schedulesRouter.get('/me/asprovider', providerSchedulesController.index);

export default schedulesRouter;
