import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';

export default class SchedulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(schedule);
  }
}
