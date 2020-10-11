import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderConfigurationController from '../controllers/ProviderConfigurationController';
import workSchedulesRouter from './workSchedules.routes';
import ProviderController from '../controllers/ProviderController';

const providersRouter = Router();
const providerController = new ProviderController();
const providerConfigurationController = new ProviderConfigurationController();

providersRouter.use(ensureAuthenticated);
providersRouter.use('/workschedules', workSchedulesRouter);

providersRouter.get('/:provider_id', providerController.show);
providersRouter.get('/', providerController.index);

providersRouter.post('/', providerConfigurationController.create);

export default providersRouter;
