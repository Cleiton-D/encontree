import CreateProviderDTO from '../dtos/CreateProviderDTO';
import Provider from '../infra/typeorm/entities/Provider';

export default interface IProvidersRepository {
  findById: (id: string) => Promise<Provider | undefined>;
  findByUserId: (userId: string) => Promise<Provider | undefined>;
  create: (data: CreateProviderDTO) => Promise<Provider>;
  update: (provider: Provider) => Promise<Provider>;
}
