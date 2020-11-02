import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import AppError from '@shared/errors/AppError';
import IWorkSchedulesRepository from '@modules/providers/repositories/IWorkSchedulesRepository';
import { isBefore, startOfHour, parseISO } from 'date-fns';
import ISchedulesRepository from '../repositories/ISchedulesRepository';
import Schedule from '../infra/typeorm/entities/Schedule';

type CreateScheduleRequest = {
  provider_id: string;
  user_id: string;
  date: string;
};

type Day = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

@injectable()
class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('WorkSchedulesRepository')
    private workSchedulesRepository: IWorkSchedulesRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: CreateScheduleRequest): Promise<Schedule> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const parsedDate = parseISO(date);
    const dateWithoutMinutes = startOfHour(parsedDate);

    if (isBefore(dateWithoutMinutes, Date.now())) {
      throw new AppError(
        'It is not possible to create a schedule on a past date',
      );
    }

    const provider = await this.providersRepository.findById(provider_id);
    if (!provider) {
      throw new AppError('Provider not found');
    }

    if (provider.user_id === user_id) {
      throw new AppError('You can only create a schedule with yourself');
    }

    const days: Day[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const dayStr = days[parsedDate.getDay()];

    const workSchedule = await this.workSchedulesRepository.findByProviderAndDay(
      { providerId: provider_id, day: dayStr },
    );

    if (!workSchedule) {
      throw new AppError(
        'You cannot create a schedule on this day and provider',
      );
    }

    const existSchedule = await this.schedulesRepository.findByDate(
      dateWithoutMinutes,
      provider_id,
    );

    if (existSchedule) {
      throw new AppError('This time is not available');
    }

    const schedule = await this.schedulesRepository.create({
      provider_id,
      user_id,
      date: dateWithoutMinutes,
    });

    // TODO criar implementação para notificações

    return schedule;
  }
}

export default CreateScheduleService;
