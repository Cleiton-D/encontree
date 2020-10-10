import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateWorkSchedulesService, {
  WorkScheduleItem,
} from '@modules/providers/services/UpdateWorkSchedulesService';

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
}
