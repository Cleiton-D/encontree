import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IProvidersRepository from '../repositories/IProvidersRepository';
import IWorkSchedulesRepository from '../repositories/IWorkSchedulesRepository';

type ListHoursAvailableInDayRequest = {
  provider_id: string;
  day: number;
  month: number;
  year: number;
};

type ListHoursAvailableInDayResponse = Array<{
  hour: number;
  available: boolean;
}>;

type Day = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

@injectable()
class ListHoursAvailableInDayService {
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
    day,
    month,
    year,
  }: ListHoursAvailableInDayRequest): Promise<ListHoursAvailableInDayResponse> {
    const daysOfWeek: Day[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const date = new Date(year, month, day);

    const [schedules, workSchedule] = await Promise.all([
      this.schedulesRepository.findInDayByProvider({
        provider_id,
        day,
        month: month + 1,
        year,
      }),
      this.workSchedulesRepository.findByProviderAndDay({
        providerId: provider_id,
        day: daysOfWeek[date.getDay()],
      }),
    ]);

    const hourStart = 7;

    const hoursInDay = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());
    const hoursAvailable = hoursInDay.map(hour => {
      if (!workSchedule || workSchedule.disabled) {
        return { hour, available: false };
      }

      const hasScheduleInHour = schedules.find(
        schedule => getHours(schedule.date) === hour,
      );

      const compareDate = new Date(year, month, day, hour);
      return {
        hour,
        available: !hasScheduleInHour && isAfter(compareDate, currentDate),
      };
    });

    return hoursAvailable;
  }
}

export default ListHoursAvailableInDayService;
