import { getRepository, Raw, Repository } from 'typeorm';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import CreateScheduleDTO from '@modules/schedules/dtos/CreateScheduleDTO';
import FindInMonthByProviderDTO from '@modules/schedules/dtos/FindInMonthByProviderDTO';
import FindInDayByProviderDTO from '@modules/schedules/dtos/FindInDayByProviderDTO';
import Schedule from '../entities/Schedule';

class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async create(data: CreateScheduleDTO): Promise<Schedule> {
    const schedule = this.ormRepository.create(data);
    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return schedule;
  }

  public async findInMonthByProvider({
    provider_id,
    month,
    year,
  }: FindInMonthByProviderDTO): Promise<Schedule[]> {
    const monthStr = String(month).padStart(2, '0');

    const schedules = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          field => `to_char(${field}, 'MM-YYYY') = '${monthStr}-${year}'`,
        ),
      },
    });

    return schedules;
  }

  public async findInDayByProvider({
    provider_id,
    day,
    month,
    year,
  }: FindInDayByProviderDTO): Promise<Schedule[]> {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(month).padStart(2, '0');

    const schedules = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          field =>
            `to_char(${field}, 'DD-MM-YYYY') = '${dayStr}-${monthStr}-${year}'`,
        ),
      },
    });

    return schedules;
  }
}

export default SchedulesRepository;