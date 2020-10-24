import { Router } from 'express';

import ProviderWorkSchedulesController from '../controllers/ProviderWorkSchedulesController';

const workSchedulesRouter = Router();
const providerWorkSchedulesController = new ProviderWorkSchedulesController();

workSchedulesRouter.put('/', providerWorkSchedulesController.update);
workSchedulesRouter.get('/', providerWorkSchedulesController.index);

export default workSchedulesRouter;
