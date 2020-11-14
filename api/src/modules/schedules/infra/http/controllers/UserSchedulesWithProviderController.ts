import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowLastScheduleWithUserService from '@modules/schedules/services/ShowLastScheduleWithUser';

export default class UserSchedulesWithProviderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user } = request.query;

    const showLastScheduleWithUser = container.resolve(
      ShowLastScheduleWithUserService,
    );
    const schedule = await showLastScheduleWithUser.execute({
      user_id: user as string,
      provider_user_id: user_id,
    });

    return response.json(classToClass(schedule));
  }
}
