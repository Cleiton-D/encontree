import CreateProviderDTO from '@modules/providers/dtos/CreateProviderDTO';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import { getRepository, Repository } from 'typeorm';
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
