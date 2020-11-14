import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ConversationsController from '../controllers/ConversationsController';

const conversationsRouter = Router();
const conversationsController = new ConversationsController();

conversationsRouter.use(ensureAuthenticated.express);

conversationsRouter.get('/', conversationsController.index);

export default conversationsRouter;
