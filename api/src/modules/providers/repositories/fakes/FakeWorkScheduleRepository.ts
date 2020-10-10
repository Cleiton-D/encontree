import { uuid } from 'uuidv4';

import CreateWorkScheduleDTO from '@modules/providers/dtos/CreateWorkScheduleDTO';
import WorkSchedule from '@modules/providers/infra/typeorm/entities/WorkSchedule';
import IWorkScheduleRepository from '../IWorkScheduleRepository';

class FakeWorkScheduleRepository implements IWorkScheduleRepository {
  private workSchedules: WorkSchedule[] = [];

  public async findById(id: string): Promise<WorkSchedule | undefined> {
    const workSchedule = this.workSchedules.find(ws => ws.id === id);
    return workSchedule;
  }

  public async findAllByProvider(providerId: string): Promise<WorkSchedule[]> {
    return this.workSchedules.filter(
      workSchedule => workSchedule.provider_id === providerId,
    );
  }

  public async create(data: CreateWorkScheduleDTO): Promise<WorkSchedule> {
    const workSchedule = new WorkSchedule();
    Object.assign(workSchedule, { id: uuid(), ...data });

    this.workSchedules.push(workSchedule);
    return workSchedule;
  }

  public async update(workSchedule: WorkSchedule): Promise<WorkSchedule> {
    const findIndex = this.workSchedules.findIndex(
      findWorkSchedule => findWorkSchedule.id === workSchedule.id,
    );
    this.workSchedules[findIndex] = workSchedule;

    return workSchedule;
  }
}

export default FakeWorkScheduleRepository;
