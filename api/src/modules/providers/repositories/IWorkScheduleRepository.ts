import CreateWorkScheduleDTO from '../dtos/CreateWorkScheduleDTO';
import WorkSchedule from '../infra/typeorm/entities/WorkSchedule';

export default interface IWorkScheduleRepository {
  findById: (workScheduleId: string) => Promise<WorkSchedule | undefined>;
  findAllByProvider: (providerId: string) => Promise<WorkSchedule[]>;
  create: (data: CreateWorkScheduleDTO) => Promise<WorkSchedule>;
  update: (workSchedule: WorkSchedule) => Promise<WorkSchedule>;
}
