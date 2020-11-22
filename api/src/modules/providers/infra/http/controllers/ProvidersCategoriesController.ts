import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCategoriesService from '@modules/providers/services/ListCategoriesService';

export default class ProvidersCategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesService);

    const categories = await listCategories.execute();
    return response.json(classToClass(categories));
  }
}
