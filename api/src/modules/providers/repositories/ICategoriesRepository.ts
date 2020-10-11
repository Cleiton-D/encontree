import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findById: (category_id: string) => Promise<Category | undefined>;
  findAll: () => Promise<Category[]>;
}
