import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserSchedulesService from '@modules/schedules/services/ListUserSchedulesService';
import { classToClass } from 'class-transformer';

export default class UserSchedulesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listUserSchedules = container.resolve(ListUserSchedulesService);
    const schedules = await listUserSchedules.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(schedules));
  }
}
