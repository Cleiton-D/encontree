import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateWorkSchedulesService, {
  WorkScheduleItem,
} from '@modules/providers/services/UpdateWorkSchedulesService';
import ListWorkSchedulesService from '@modules/providers/services/ListWorkSchedulesService';

export default class ProviderWorkSchedulesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const body = request.body as WorkScheduleItem[];

    const updateWorkSchedules = container.resolve(UpdateWorkSchedulesService);
    const workSchedules = await updateWorkSchedules.execute({
      user_id,
      workSchedules: body,
    });

    return response.json(classToClass(workSchedules));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listWorkSchedules = container.resolve(ListWorkSchedulesService);
    const workSchedules = await listWorkSchedules.execute({ user_id });

    return response.json(classToClass(workSchedules));
  }
}
