import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const multerUpload = multer(uploadConfig.multer);

usersRouter.get('/:user_id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated.express,
  multerUpload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
