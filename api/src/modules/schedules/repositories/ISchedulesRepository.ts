import CreateScheduleDTO from '../dtos/CreateScheduleDTO';
import FindInDayByProviderDTO from '../dtos/FindInDayByProviderDTO';
import FindInDayByUserDTO from '../dtos/FindInDayByUserDTO';
import FindInMonthByProviderDTO from '../dtos/FindInMonthByProviderDTO';
import FindLastDTO from '../dtos/FindLastDTO';

import Schedule from '../infra/typeorm/entities/Schedule';

export default interface ISchedulesRepository {
  create: (data: CreateScheduleDTO) => Promise<Schedule>;
  findById: (schedule_id: string) => Promise<Schedule | undefined>;
  findByDate: (
    date: Date,
    provider_id: string,
  ) => Promise<Schedule | undefined>;
  findInMonthByProvider: (
    data: FindInMonthByProviderDTO,
  ) => Promise<Schedule[]>;
  findInDayByProvider: (data: FindInDayByProviderDTO) => Promise<Schedule[]>;
  findInDayByUser: (data: FindInDayByUserDTO) => Promise<Schedule[]>;
  findAllByUser: (providerId: string) => Promise<Schedule[]>;
  findLast: (data: FindLastDTO) => Promise<Schedule | undefined>;
}
