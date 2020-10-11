import CreateScheduleDTO from '../dtos/CreateScheduleDTO';
import FindInDayByProviderDTO from '../dtos/FindInDayByProviderDTO';
import FindInMonthByProviderDTO from '../dtos/FindInMonthByProviderDTO';
import Schedule from '../infra/typeorm/entities/Schedule';

export default interface ISchedulesRepository {
  create: (data: CreateScheduleDTO) => Promise<Schedule>;
  findByDate: (
    date: Date,
    provider_id: string,
  ) => Promise<Schedule | undefined>;
  findInMonthByProvider: (
    data: FindInMonthByProviderDTO,
  ) => Promise<Schedule[]>;
  findInDayByProvider: (data: FindInDayByProviderDTO) => Promise<Schedule[]>;
}
