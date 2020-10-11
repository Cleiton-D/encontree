import { uuid } from 'uuidv4';

import CreateWorkScheduleDTO from '@modules/providers/dtos/CreateWorkScheduleDTO';
import WorkSchedule from '@modules/providers/infra/typeorm/entities/WorkSchedule';
import FindByProviderAndDayDTO from '@modules/providers/dtos/FindByProviderAndDayDTO';
import IWorkScheduleRepository from '../IWorkSchedulesRepository';

class FakeWorkSchedulesRepository implements IWorkScheduleRepository {
  private workSchedules: WorkSchedule[] = [];

  public async findById(id: string): Promise<WorkSchedule | undefined> {
    const workSchedule = this.workSchedules.find(ws => ws.id === id);
    return workSchedule;
  }

  public async findByProviderAndDay({
    providerId,
    day,
  }: FindByProviderAndDayDTO): Promise<WorkSchedule | undefined> {
    const workSchedule = this.workSchedules.find(
      ws => ws.day === day && ws.provider_id === providerId,
    );

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

  public async createMany(
    items: CreateWorkScheduleDTO[],
  ): Promise<WorkSchedule[]> {
    const schedules = items.map(item => {
      const workSchedule = new WorkSchedule();
      Object.assign(workSchedule, { id: uuid(), ...item });
      return workSchedule;
    });

    this.workSchedules.push(...schedules);
    return schedules;
  }

  public async update(workSchedule: WorkSchedule): Promise<WorkSchedule> {
    const findIndex = this.workSchedules.findIndex(
      findWorkSchedule => findWorkSchedule.id === workSchedule.id,
    );
    this.workSchedules[findIndex] = workSchedule;

    return workSchedule;
  }

  public async updateMany(items: WorkSchedule[]): Promise<WorkSchedule[]> {
    items.forEach(item => {
      const index = this.workSchedules.findIndex(ws => ws.id === item.id);
      this.workSchedules[index] = item;
    });
    return items;
  }
}

export default FakeWorkSchedulesRepository;
