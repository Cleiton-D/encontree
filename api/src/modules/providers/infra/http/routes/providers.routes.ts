import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderConfigurationController from '../controllers/ProviderConfigurationController';
import workSchedulesRouter from './workSchedules.routes';
import ProviderController from '../controllers/ProviderController';
import ProviderDaysAvailabilityInMonthController from '../controllers/ProviderDaysAvailableInMonthController';

const providersRouter = Router();
const providerController = new ProviderController();
const providerConfigurationController = new ProviderConfigurationController();
const providerDaysAvailableInMonthController = new ProviderDaysAvailabilityInMonthController();

providersRouter.use(ensureAuthenticated);
providersRouter.use('/workschedules', workSchedulesRouter);

providersRouter.get('/:provider_id', providerController.show);
providersRouter.get('/', providerController.index);

providersRouter.post('/', providerConfigurationController.create);

providersRouter.get(
  '/:provider_id/days-available',
  providerDaysAvailableInMonthController.index,
);

export default providersRouter;
