import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import ShowScheduleService from '@modules/schedules/services/ShowScheduleService';

export default class SchedulesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { schedule_id } = request.params;

    const showSchedule = container.resolve(ShowScheduleService);

    const schedule = await showSchedule.execute({ user_id, schedule_id });
    return response.json(classToClass(schedule));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(classToClass(schedule));
  }
}
