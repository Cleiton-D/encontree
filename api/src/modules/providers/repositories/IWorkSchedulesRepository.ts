import CreateWorkScheduleDTO from '../dtos/CreateWorkScheduleDTO';
import FindByProviderAndDayDTO from '../dtos/FindByProviderAndDayDTO';
import WorkSchedule from '../infra/typeorm/entities/WorkSchedule';

export default interface IWorkSchedulesRepository {
  findById: (workScheduleId: string) => Promise<WorkSchedule | undefined>;
  findByProviderAndDay: (
    data: FindByProviderAndDayDTO,
  ) => Promise<WorkSchedule | undefined>;
  findAllByProvider: (providerId: string) => Promise<WorkSchedule[]>;
  create: (data: CreateWorkScheduleDTO) => Promise<WorkSchedule>;
  createMany: (items: CreateWorkScheduleDTO[]) => Promise<WorkSchedule[]>;
  update: (workSchedule: WorkSchedule) => Promise<WorkSchedule>;
  updateMany: (items: WorkSchedule[]) => Promise<WorkSchedule[]>;
}
