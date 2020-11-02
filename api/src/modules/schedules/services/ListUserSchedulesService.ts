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
    if (day && month && year) {
      return this.schedulesRepository.findInDayByUser({
        user_id,
        day,
        month,
        year,
      });
    }

    return this.schedulesRepository.findAllByUser(user_id);
  }
}

export default ListUserSchedulesService;
