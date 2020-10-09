import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderProfileController from '../controllers/ProviderProfileController';
import ProviderConfigurationController from '../controllers/ProviderConfigurationController';

const providersRouter = Router();
const providerProfileController = new ProviderProfileController();
const providerConfigurationController = new ProviderConfigurationController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/:provider_id', providerProfileController.index);
providersRouter.post('/', providerConfigurationController.create);

export default providersRouter;
