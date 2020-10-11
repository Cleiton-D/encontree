import { inject, injectable } from 'tsyringe';

import Provider from '../infra/typeorm/entities/Provider';
import IProvidersRepository from '../repositories/IProvidersRepository';

type ListProvidersRequest = {
  user_id: string;
  category_id?: string;
  search?: string;
};

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    category_id,
    search,
  }: ListProvidersRequest): Promise<Provider[]> {
    const yourselfProvider = await this.providersRepository.findByUserId(
      user_id,
    );

    const providers = await this.providersRepository.findAllProviders({
      except_provider_id: yourselfProvider?.id,
      category_id,
      search,
    });

    return providers;
  }
}

export default ListProvidersService;
