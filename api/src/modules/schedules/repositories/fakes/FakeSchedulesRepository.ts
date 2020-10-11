import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import CreateScheduleDTO from '@modules/schedules/dtos/CreateScheduleDTO';
import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';
import FindInMonthByProviderDTO from '@modules/schedules/dtos/FindInMonthByProviderDTO';
import FindInDayByProviderDTO from '@modules/schedules/dtos/FindInDayByProviderDTO';
import ISchedulesRepository from '../ISchedulesRepository';

class FakeSchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async create(data: CreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();
    Object.assign(schedule, { id: uuid(), ...data });

    this.schedules.push(schedule);
    return schedule;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Schedule | undefined> {
    const schedule = this.schedules.find(
      item => isEqual(item.date, date) && item.provider_id === provider_id,
    );

    return schedule;
  }

  public async findInMonthByProvider({
    provider_id,
    month,
    year,
  }: FindInMonthByProviderDTO): Promise<Schedule[]> {
    const schedules = this.schedules.filter(
      item =>
        item.date.getMonth() + 1 === month &&
        item.date.getFullYear() === year &&
        item.provider_id === provider_id,
    );

    return schedules;
  }

  public async findInDayByProvider({
    provider_id,
    day,
    month,
    year,
  }: FindInDayByProviderDTO): Promise<Schedule[]> {
    const schedules = this.schedules.filter(
      item =>
        item.date.getDate() === day &&
        item.date.getMonth() + 1 === month &&
        item.date.getFullYear() === year &&
        item.provider_id === provider_id,
    );

    return schedules;
  }
}

export default FakeSchedulesRepository;
