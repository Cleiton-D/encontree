import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHoursAvailableInDayService from '@modules/providers/services/ListHoursAvailableInDayService';

export default class ProviderDaysAvailabilityInMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listHoursAvailableInDay = container.resolve(
      ListHoursAvailableInDayService,
    );

    const daysAvailable = await listHoursAvailableInDay.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(daysAvailable);
  }
}
