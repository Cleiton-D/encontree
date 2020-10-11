import { uuid } from 'uuidv4';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import CreateProviderDTO from '@modules/providers/dtos/CreateProviderDTO';
import FindAllProvidersDTO from '@modules/providers/dtos/FindAllProvidersDTO';
import IProvidersRepository from '../IProvidersRepository';

class FakeProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = [];

  public async findById(id: string): Promise<Provider | undefined> {
    const findprovider = this.providers.find(provider => provider.id === id);
    return findprovider;
  }

  public async findByUserId(userId: string): Promise<Provider | undefined> {
    const findProvider = this.providers.find(
      provider => provider.user_id === userId,
    );
    return findProvider;
  }

  public async findAllProviders({
    except_provider_id,
    category_id,
  }: FindAllProvidersDTO): Promise<Provider[]> {
    let providers: Provider[] = [];

    if (except_provider_id) {
      providers = this.providers.filter(
        provider => provider.id !== except_provider_id,
      );
    } else {
      providers = this.providers;
    }

    if (category_id) {
      return providers.filter(provider => provider.category_id === category_id);
    }

    return providers;
  }

  public async create(data: CreateProviderDTO): Promise<Provider> {
    const provider = new Provider();
    Object.assign(provider, { id: uuid(), ...data });

    this.providers.push(provider);
    return provider;
  }

  public async update(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id,
    );
    this.providers[findIndex] = provider;

    return provider;
  }
}

export default FakeProvidersRepository;
