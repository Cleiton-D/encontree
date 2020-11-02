import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, username, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, username, password });
    return response.json(classToClass(user));
  }
}
