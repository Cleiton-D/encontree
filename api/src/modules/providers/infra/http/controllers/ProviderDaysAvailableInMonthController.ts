import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDaysAvailableInMonthService from '@modules/providers/services/ListDaysAvailableInMonthService';

export default class ProviderDaysAvailabilityInMonthController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listDaysAvailableInMonth = container.resolve(
      ListDaysAvailableInMonthService,
    );

    const daysAvailable = await listDaysAvailableInMonth.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(daysAvailable);
  }
}
