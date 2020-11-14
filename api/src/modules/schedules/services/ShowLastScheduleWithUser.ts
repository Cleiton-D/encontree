import { inject, injectable } from 'tsyringe';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import Schedule from '../infra/typeorm/entities/Schedule';

type ShowLastScheduleWithUserRequest = {
  provider_user_id: string;
  user_id: string;
};

@injectable()
class ShowLastScheduleWithUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({
    provider_user_id,
    user_id,
  }: ShowLastScheduleWithUserRequest): Promise<Schedule | undefined> {
    const provider = await this.providersRepository.findByUserId(
      provider_user_id,
    );

    if (!provider) {
      throw new AppError('Provider not found');
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const schedule = await this.schedulesRepository.findLast({
      provider_id: provider.id,
      user_id,
    });

    return schedule;
  }
}

export default ShowLastScheduleWithUserService;
