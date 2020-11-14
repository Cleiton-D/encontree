import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ValidateSessionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }
}
