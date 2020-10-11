import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

type ListProviderSchedulesRequest = {
  user_id: string;
  day: number;
  month: number;
  year: number;
};

@injectable()
class ListProviderSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: ListProviderSchedulesRequest): Promise<Schedule[]> {
    const provider = await this.providersRepository.findByUserId(user_id);
    if (!provider) {
      throw new AppError('Provider not found');
    }

    const schedules = await this.schedulesRepository.findInDayByProvider({
      provider_id: provider.id,
      day,
      month,
      year,
    });

    return schedules;
  }
}

export default ListProviderSchedulesService;
