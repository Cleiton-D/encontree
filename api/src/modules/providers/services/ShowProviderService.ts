import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '../repositories/IProvidersRepository';
import Provider from '../infra/typeorm/entities/Provider';

type ShowProviderRequest = {
  provider_id: string;
  user_id: string;
};

@injectable()
class ShowProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
  }: ShowProviderRequest): Promise<Provider> {
    let provider;
    if (provider_id) {
      provider = await this.providersRepository.findById(provider_id);
    } else {
      provider = await this.providersRepository.findByUserId(user_id);
    }

    if (!provider) {
      throw new AppError('Provider not found');
    }
    return provider;
  }
}

export default ShowProviderService;
