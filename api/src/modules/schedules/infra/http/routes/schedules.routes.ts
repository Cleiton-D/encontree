import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderSchedulesController from '../controllers/ProviderSchedulesController';
import SchedulesController from '../controllers/SchedulesController';
import UserSchedulesController from '../controllers/UserSchedulesController';
import UserSchedulesWithProviderController from '../controllers/UserSchedulesWithProviderController';

const schedulesRouter = Router();
const schedulesController = new SchedulesController();
const userSchedulesController = new UserSchedulesController();
const providerSchedulesController = new ProviderSchedulesController();
const userSchedulesWithProviderController = new UserSchedulesWithProviderController();

schedulesRouter.use(ensureAuthenticated.express);

schedulesRouter.post('/', schedulesController.create);
schedulesRouter.get('/show/:schedule_id', schedulesController.show);
schedulesRouter.get('/me', userSchedulesController.index);
schedulesRouter.get('/me/asprovider', providerSchedulesController.index);
schedulesRouter.get('/me/last', userSchedulesWithProviderController.show);

export default schedulesRouter;
