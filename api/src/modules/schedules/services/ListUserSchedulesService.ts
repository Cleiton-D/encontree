import { inject, injectable } from 'tsyringe';

import Schedule from '../infra/typeorm/entities/Schedule';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

type ListUserSchedulesRequest = {
  user_id: string;
  day: number;
  month: number;
  year: number;
};

@injectable()
class ListUserSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: ListUserSchedulesRequest): Promise<Schedule[]> {
    const schedules = await this.schedulesRepository.findInDayByUser({
      user_id,
      day,
      month,
      year,
    });

    return schedules;
  }
}

export default ListUserSchedulesService;
