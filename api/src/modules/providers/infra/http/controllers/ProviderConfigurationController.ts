import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SaveProviderConfigurationService from '@modules/providers/services/SaveProviderConfigurationService';

export default class ProviderConfigurationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description, category_id } = request.body;

    const saveProviderConfiguration = container.resolve(
      SaveProviderConfigurationService,
    );

    const provider = await saveProviderConfiguration.execute({
      description,
      category_id,
      user_id,
    });

    return response.json(classToClass(provider));
  }
}
