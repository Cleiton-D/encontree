import Category from '@modules/providers/infra/typeorm/entities/Category';
import { getRepository, MigrationInterface } from 'typeorm';

export default class CategoriesSeed1602206578890 implements MigrationInterface {
  public async up(): Promise<void> {
    const respository = getRepository(Category);

    const category1 = respository.create({ description: 'categoria 1' });
    const category2 = respository.create({ description: 'categoria 2' });
    const category3 = respository.create({ description: 'categoria 3' });

    await Promise.all([
      respository.save(category1),
      respository.save(category2),
      respository.save(category3),
    ]);
  }

  public async down(): Promise<void> {
    console.info('down');
  }
}
