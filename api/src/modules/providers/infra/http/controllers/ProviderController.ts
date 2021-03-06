import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProviderService from '@modules/providers/services/ShowProviderService';
import ListProvidersService from '@modules/providers/services/ListProvidersService';

export default class ProviderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id } = request.params;

    const showProvider = container.resolve(ShowProviderService);
    const provider = await showProvider.execute({ provider_id, user_id });

    return response.json(classToClass(provider));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { category, search, limit } = request.query;

    const listProviders = container.resolve(ListProvidersService);
    const providers = await listProviders.execute({
      user_id,
      category_id: category as string,
      search: search as string,
      limit: Number(limit),
    });

    return response.json(classToClass(providers));
  }
}
