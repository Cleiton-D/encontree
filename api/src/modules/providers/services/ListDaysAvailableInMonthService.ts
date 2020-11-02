import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, isAfter } from 'date-fns';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';
import IWorkSchedulesRepository from '../repositories/IWorkSchedulesRepository';

type ListDaysAvailableInMonthRequest = {
  provider_id: string;
  month: number;
  year: number;
};

type ListDaysAvailableInMonthResponse = Array<{
  day: number;
  available: boolean;
}>;

type Day = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

@injectable()
class ListDaysAvailableInMonthService {
  constructor(
    @inject('ProvidersRepository')
    private providerRepository: IProvidersRepository,
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('WorkSchedulesRepository')
    private workSchedulesRepository: IWorkSchedulesRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: ListDaysAvailableInMonthRequest): Promise<
    ListDaysAvailableInMonthResponse
  > {
    const schedules = await this.schedulesRepository.findInMonthByProvider({
      provider_id,
      month,
      year,
    });

    const workSchedules = await this.workSchedulesRepository.findAllByProvider(
      provider_id,
    );

    const lastDayOfMonth = getDaysInMonth(new Date(year, month - 1));

    const daysOfMonth = Array.from(
      { length: lastDayOfMonth },
      (_, index) => index + 1,
    );

    const daysOfWeek: Day[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    const daysAvailability = daysOfMonth.map(day => {
      const date = new Date(year, month - 1, day);
      const workSchedule = workSchedules.find(
        item => item.day === daysOfWeek[date.getDate()],
      );
      if (!workSchedule) {
        return {
          day,
          available: false,
        };
      }
      // TODO tem que verificar isso dps
      date.setHours(workSchedule.end);

      const schedulesInDay = schedules.filter(
        item => item.date.getDate() === day,
      );

      return {
        day,
        available:
          isAfter(date, new Date()) &&
          schedulesInDay.length <= workSchedule.end - workSchedule.start,
      };
    });

    return daysAvailability;
  }
}

export default ListDaysAvailableInMonthService;
