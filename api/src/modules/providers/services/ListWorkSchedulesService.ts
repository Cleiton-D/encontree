import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import WorkSchedule from '../infra/typeorm/entities/WorkSchedule';

import IProvidersRepository from '../repositories/IProvidersRepository';
import IWorkSchedulesRepository from '../repositories/IWorkSchedulesRepository';

type ListWorkSchedulesRequest = {
  user_id: string;
};

@injectable()
class ListWorkSchedulesService {
  constructor(
    @inject('WorkSchedulesRepository')
    private workSchedulesRepository: IWorkSchedulesRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
  }: ListWorkSchedulesRequest): Promise<WorkSchedule[]> {
    const provider = await this.providersRepository.findByUserId(user_id);
    if (!provider) {
      throw new AppError('Provider not found');
    }

    const workSchedules = await this.workSchedulesRepository.findAllByProvider(
      provider.id,
    );

    return workSchedules;
  }
}

export default ListWorkSchedulesService;
