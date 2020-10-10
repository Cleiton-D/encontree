import { getRepository, Repository } from 'typeorm';

import IWorkScheduleRepository from '@modules/providers/repositories/IWorkScheduleRepository';
import CreateWorkScheduleDTO from '@modules/providers/dtos/CreateWorkScheduleDTO';
import WorkSchedule from '../entities/WorkSchedule';

class WorkScheduleRepository implements IWorkScheduleRepository {
  private ormRepository: Repository<WorkSchedule>;

  constructor() {
    this.ormRepository = getRepository(WorkSchedule);
  }

  public async findById(id: string): Promise<WorkSchedule | undefined> {
    const workSchedule = await this.ormRepository.findOne(id);
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

  public async update(workSchedule: WorkSchedule): Promise<WorkSchedule> {
    return this.ormRepository.save(workSchedule);
  }
}

export default WorkScheduleRepository;
