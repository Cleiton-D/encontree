import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '../repositories/IProvidersRepository';
import Provider from '../infra/typeorm/entities/Provider';

@injectable()
class ShowProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(providerId: string): Promise<Provider> {
    const provider = await this.providersRepository.findById(providerId);
    if (!provider) {
      throw new AppError('Provider not found');
    }
    return provider;
  }
}

export default ShowProviderService;
