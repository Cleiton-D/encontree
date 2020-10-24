import { Router } from 'express';

import ProvidersCategoriesController from '../controllers/ProvidersCategoriesController';

const categoriesRouter = Router();
const providersCategoriesController = new ProvidersCategoriesController();

categoriesRouter.get('/', providersCategoriesController.index);

export default categoriesRouter;
