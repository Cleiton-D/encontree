import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/providers/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(category_id: string): Promise<Category | undefined> {
    return this.ormRepository.findOne(category_id);
  }

  public async findAll(): Promise<Category[]> {
    return this.ormRepository.find();
  }
}

export default CategoriesRepository;
