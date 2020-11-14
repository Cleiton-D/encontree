import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SessionsController from '../controllers/SessionsController';
import ValidateSessionController from '../controllers/ValidateSessionController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const validateSessionController = new ValidateSessionController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.get(
  '/validate',
  ensureAuthenticated.express,
  validateSessionController.show,
);

export default sessionsRouter;
