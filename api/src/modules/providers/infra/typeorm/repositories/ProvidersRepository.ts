import { FindConditions, getRepository, Not, Repository } from 'typeorm';

import CreateProviderDTO from '@modules/providers/dtos/CreateProviderDTO';
import FindAllProvidersDTO from '@modules/providers/dtos/FindAllProvidersDTO';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne(id);
    return provider;
  }

  public async findByUserId(userId: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne({
      where: { user_id: userId },
    });

    return provider;
  }

  public async findAllProviders({
    except_provider_id,
    category_id,
  }: FindAllProvidersDTO): Promise<Provider[]> {
    const where: FindConditions<Provider> = {};

    if (except_provider_id) where.id = Not(except_provider_id);
    if (category_id) where.category_id = category_id;

    return this.ormRepository.find({ where, relations: ['user'] });
  }

  public async create(data: CreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(data);
    await this.ormRepository.save(provider);

    return provider;
  }

  public async update(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }
}

export default ProvidersRepository;
