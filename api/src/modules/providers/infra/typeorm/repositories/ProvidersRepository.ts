import {
  Brackets,
  EntityManager,
  getManager,
  getRepository,
  Repository,
} from 'typeorm';

import CreateProviderDTO from '@modules/providers/dtos/CreateProviderDTO';
import FindAllProvidersDTO from '@modules/providers/dtos/FindAllProvidersDTO';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  private ormManager: EntityManager;

  constructor() {
    this.ormRepository = getRepository(Provider);
    this.ormManager = getManager();
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne(id, {
      relations: ['user'],
    });
    return provider;
  }

  public async findByUserId(userId: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne({
      where: { user_id: userId },
      relations: ['user'],
    });

    return provider;
  }

  public async findAllProviders({
    except_provider_id,
    category_id,
    search,
  }: FindAllProvidersDTO): Promise<Provider[]> {
    const queryBuilder = this.ormManager
      .createQueryBuilder()
      .select('providers')
      .from(Provider, 'providers')
      .innerJoinAndSelect('providers.user', 'user')
      .innerJoinAndSelect('providers.category', 'category')
      .where('1 = 1');

    if (except_provider_id) {
      queryBuilder.andWhere('providers.id != :exceptProvider', {
        exceptProvider: except_provider_id,
      });
    }

    if (category_id) {
      queryBuilder.andWhere('providers.category_id = :category', {
        category: category_id,
      });
    }

    if (search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('lower(user.name) LIKE lower(:search)', {
            search: `%${search}%`,
          }).orWhere('lower(user.username) LIKE lower(:search)', {
            search: `%${search}%`,
          });
        }),
      );
    }

    return queryBuilder.getMany();
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
