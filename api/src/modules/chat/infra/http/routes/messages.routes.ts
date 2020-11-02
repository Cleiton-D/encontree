import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import MessagesController from '../controllers/MessagesController';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.use(ensureAuthenticated.express);

messagesRouter.get('/', messagesController.index);

export default messagesRouter;
