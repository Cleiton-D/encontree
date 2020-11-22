import Category from '@modules/providers/infra/typeorm/entities/Category';
import { getRepository, MigrationInterface } from 'typeorm';

export default class CategoriesSeed1602206578890 implements MigrationInterface {
  public async up(): Promise<void> {
    const respository = getRepository(Category);

    const limpeza = respository.create({
      description: 'Profissional de limpeza',
      image: 'limpeza.jpg',
    });

    const eletricista = respository.create({
      description: 'Técnico eletricista',
      image: 'eletrica.jpg',
    });

    const informatica = respository.create({
      description: 'Técnico de informática',
      image: 'informatica.jpg',
    });

    const freteiro = respository.create({
      description: 'Freteiro/Transportes',
      image: 'transporte.jpg',
    });

    const montador = respository.create({
      description: 'Montador de móveis',
      image: 'moveis.jpg',
    });

    const encanador = respository.create({
      description: 'Técnico hidrálico/encanador',
      image: 'encanador.png',
    });

    const salao = respository.create({
      description: 'Salão de beleza',
      image: 'salao.png',
    });

    const barbearia = respository.create({
      description: 'Barbearia',
      image: 'barbearia.jpg',
    });

    const jardinagem = respository.create({
      description: 'Jardinagem',
      image: 'jardinagem.jpg',
    });

    await Promise.all([
      respository.save(limpeza),
      respository.save(eletricista),
      respository.save(informatica),
      respository.save(freteiro),
      respository.save(montador),
      respository.save(encanador),
      respository.save(salao),
      respository.save(barbearia),
      respository.save(jardinagem),
    ]);
  }

  public async down(): Promise<void> {
    console.info('down');
  }
}
