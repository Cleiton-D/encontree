import { getRepository, Repository } from 'typeorm';

import IWorkScheduleRepository from '@modules/providers/repositories/IWorkSchedulesRepository';
import CreateWorkScheduleDTO from '@modules/providers/dtos/CreateWorkScheduleDTO';
import FindByProviderAndDayDTO from '@modules/providers/dtos/FindByProviderAndDayDTO';
import WorkSchedule from '../entities/WorkSchedule';

class WorkSchedulesRepository implements IWorkScheduleRepository {
  private ormRepository: Repository<WorkSchedule>;

  constructor() {
    this.ormRepository = getRepository(WorkSchedule);
  }

  public async findById(id: string): Promise<WorkSchedule | undefined> {
    const workSchedule = await this.ormRepository.findOne(id);
    return workSchedule;
  }

  public async findByProviderAndDay({
    day,
    providerId,
  }: FindByProviderAndDayDTO): Promise<WorkSchedule | undefined> {
    const workSchedule = await this.ormRepository.findOne({
      where: { provider_id: providerId, day },
    });

    return workSchedule;
  }

  public async findAllByProvider(providerId: string): Promise<WorkSchedule[]> {
    const workSchedules = await this.ormRepository.find({
      where: { provider_id: providerId },
    });
    return workSchedules;
  }

  public async create(data: CreateWorkScheduleDTO): Promise<WorkSchedule> {
    const workSchedule = this.ormRepository.create(data);
    await this.ormRepository.save(workSchedule);

    return workSchedule;
  }

  public async createMany(
    items: CreateWorkScheduleDTO[],
  ): Promise<WorkSchedule[]> {
    const workSchedules = items.map<WorkSchedule>(item =>
      this.ormRepository.create(item),
    );
    await this.ormRepository.save(workSchedules);

    return workSchedules;
  }

  public async update(workSchedule: WorkSchedule): Promise<WorkSchedule> {
    return this.ormRepository.save(workSchedule);
  }

  public async updateMany(items: WorkSchedule[]): Promise<WorkSchedule[]> {
    return this.ormRepository.save(items);
  }
}

export default WorkSchedulesRepository;
