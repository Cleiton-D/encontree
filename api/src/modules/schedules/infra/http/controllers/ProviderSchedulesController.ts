import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListProviderSchedulesService from '@modules/schedules/services/ListProviderSchedulesService';

export default class ProviderSchedulesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderSchedyles = container.resolve(
      ListProviderSchedulesService,
    );

    const schedules = await listProviderSchedyles.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(schedules));
  }
}
