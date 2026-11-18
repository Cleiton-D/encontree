import Category from '@modules/providers/infra/typeorm/entities/Category';
import { getRepository, MigrationInterface } from 'typeorm';

export default class CategoriesSeed1602206578890 implements MigrationInterface {
  public async up(): Promise<void> {
    const respository = getRepository(Category);

    const cleaning = respository.create({
      description: 'Cleaning professional',
      image: 'cleaning.jpg',
    });

    const electrician = respository.create({
      description: 'Electrician',
      image: 'electrician.jpg',
    });

    const itTechnician = respository.create({
      description: 'IT technician',
      image: 'it-technician.jpg',
    });

    const transport = respository.create({
      description: 'Moving/Transport',
      image: 'transport.jpg',
    });

    const furnitureAssembler = respository.create({
      description: 'Furniture assembler',
      image: 'furniture.jpg',
    });

    const plumber = respository.create({
      description: 'Plumber',
      image: 'plumber.png',
    });

    const beautySalon = respository.create({
      description: 'Beauty salon',
      image: 'beauty-salon.png',
    });

    const barbershop = respository.create({
      description: 'Barbershop',
      image: 'barbershop.jpg',
    });

    const gardening = respository.create({
      description: 'Gardening',
      image: 'gardening.jpg',
    });

    await Promise.all([
      respository.save(cleaning),
      respository.save(electrician),
      respository.save(itTechnician),
      respository.save(transport),
      respository.save(furnitureAssembler),
      respository.save(plumber),
      respository.save(beautySalon),
      respository.save(barbershop),
      respository.save(gardening),
    ]);
  }

  public async down(): Promise<void> {
    console.info('down');
  }
}
