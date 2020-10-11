import Category from '@modules/providers/infra/typeorm/entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoryRepository implements ICategoriesRepository {
  private catetories: Category[] = [];

  public async findById(category_id: string): Promise<Category | undefined> {
    return this.catetories.find(item => item.id === category_id);
  }

  public async findAll(): Promise<Category[]> {
    return this.catetories;
  }
}

export default FakeCategoryRepository;
