import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

type ShowScheduleRequest = {
  user_id: string;
  schedule_id: string;
};

@injectable()
class ShowScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    schedule_id,
    user_id,
  }: ShowScheduleRequest): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findById(schedule_id);

    if (!schedule) {
      throw new AppError('Schedule not found');
    }

    const provider = await this.providersRepository.findByUserId(user_id);
    if (
      (schedule.user_id !== user_id && !provider) ||
      (schedule.user_id !== user_id &&
        provider &&
        schedule.provider_id !== provider.id)
    ) {
      throw new AppError('You cannot view this schedule');
    }

    return schedule;
  }
}

export default ShowScheduleService;
