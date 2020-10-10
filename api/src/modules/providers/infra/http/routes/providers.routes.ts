import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderProfileController from '../controllers/ProviderProfileController';
import ProviderConfigurationController from '../controllers/ProviderConfigurationController';
import workSchedulesRouter from './workSchedules.routes';

const providersRouter = Router();
const providerProfileController = new ProviderProfileController();
const providerConfigurationController = new ProviderConfigurationController();

providersRouter.use(ensureAuthenticated);
providersRouter.use('/workschedules', workSchedulesRouter);

providersRouter.get('/:provider_id', providerProfileController.show);
providersRouter.post('/', providerConfigurationController.create);

export default providersRouter;
