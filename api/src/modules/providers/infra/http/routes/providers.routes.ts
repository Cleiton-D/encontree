import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import workSchedulesRouter from './workSchedules.routes';

import ProviderConfigurationController from '../controllers/ProviderConfigurationController';
import ProviderController from '../controllers/ProviderController';
import ProviderDaysAvailabilityInMonthController from '../controllers/ProviderDaysAvailableInMonthController';
import ProviderHoursAvailableInDayController from '../controllers/ProviderHoursAvailableInDayController';

const providersRouter = Router();
const providerController = new ProviderController();
const providerConfigurationController = new ProviderConfigurationController();
const providerDaysAvailableInMonthController = new ProviderDaysAvailabilityInMonthController();
const providerHoursAvailableInDayController = new ProviderHoursAvailableInDayController();

providersRouter.use(ensureAuthenticated.express);
providersRouter.use('/workschedules', workSchedulesRouter);

providersRouter.get('/show/:provider_id', providerController.show);
providersRouter.get('/show', providerController.show);
providersRouter.get('/', providerController.index);

providersRouter.post('/', providerConfigurationController.create);

providersRouter.get(
  '/show/:provider_id/days-available',
  providerDaysAvailableInMonthController.index,
);

providersRouter.get(
  '/show/:provider_id/hours-available',
  providerHoursAvailableInDayController.index,
);

export default providersRouter;
