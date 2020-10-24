import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProvidersRepository from '../repositories/IProvidersRepository';
import IWorkSchedulesRepository from '../repositories/IWorkSchedulesRepository';
import WorkSchedule from '../infra/typeorm/entities/WorkSchedule';

type WorkScheduleDay = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';
type WorkScheduleRequest = {
  start: number;
  end: number;
  disabled: boolean;
};

export type WorkScheduleItem = WorkScheduleRequest & { day: WorkScheduleDay };

type UpdateWorkScheduleRequest = {
  user_id: string;
  workSchedules: Array<WorkScheduleItem>;
};

type WorkScheduleActionsItems = {
  update: WorkSchedule[];
  create: Array<WorkScheduleItem & { provider_id: string }>;
};

@injectable()
export default class UpdateWorkSchedulesService {
  constructor(
    @inject('WorkSchedulesRepository')
    private workScheduleRepository: IWorkSchedulesRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    workSchedules,
  }: UpdateWorkScheduleRequest): Promise<WorkSchedule[]> {
    const provider = await this.providersRepository.findByUserId(user_id);
    if (!provider) {
      throw new AppError('Provider not found');
    }

    const currentWorkSchedules = await this.workScheduleRepository.findAllByProvider(
      provider.id,
    );

    const actionResult = workSchedules.reduce<WorkScheduleActionsItems>(
      (accumulator, item) => {
        const currentItem = currentWorkSchedules.find(
          current => current.day === item.day,
        );
        if (currentItem) {
          Object.assign(currentItem, item);
          accumulator.update.push(currentItem);
        } else {
          accumulator.create.push({ ...item, provider_id: provider.id });
        }
        return accumulator;
      },
      {
        create: [],
        update: [],
      },
    );

    const [created, updated] = await Promise.all([
      this.workScheduleRepository.createMany(actionResult.create),
      this.workScheduleRepository.updateMany(actionResult.update),
    ]);

    return [...created, ...updated];
  }
}
