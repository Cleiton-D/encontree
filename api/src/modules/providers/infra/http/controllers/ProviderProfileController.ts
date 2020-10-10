import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ShowProviderService from '@modules/providers/services/ShowProviderService';

export default class ProviderConfigurationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const showProvider = container.resolve(ShowProviderService);
    const provider = await showProvider.execute(provider_id);

    return response.json(classToClass(provider));
  }
}
