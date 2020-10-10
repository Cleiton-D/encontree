import { Router } from 'express';

import ProviderWorkSchedulesController from '../controllers/ProviderWorkSchedulesController';

const workSchedulesRouter = Router();
const providerWorkSchedulesController = new ProviderWorkSchedulesController();

workSchedulesRouter.put('/', providerWorkSchedulesController.update);

export default workSchedulesRouter;
