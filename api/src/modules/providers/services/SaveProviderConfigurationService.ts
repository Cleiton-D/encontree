import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Provider from '../infra/typeorm/entities/Provider';
import IProvidersRepository from '../repositories/IProvidersRepository';

type SaveProviderConfigurationRequest = {
  description: string;
  category_id: string;
  user_id: string;
};

@injectable()
class SaveProviderConfigurationService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    description,
    category_id,
    user_id,
  }: SaveProviderConfigurationRequest): Promise<Provider> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const provider = await this.providersRepository.findByUserId(user_id);
    if (provider) {
      provider.category_id = category_id;
      provider.description = description;
      provider.user_id = user_id;

      return this.providersRepository.update(provider);
    }

    return this.providersRepository.create({
      category_id,
      description,
      user_id,
    });
  }
}

export default SaveProviderConfigurationService;
