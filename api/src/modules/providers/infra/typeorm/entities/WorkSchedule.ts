import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Provider from './Provider';

type Day = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab';

@Entity('work_schedules')
class WorkSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  day: Day;

  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  disabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WorkSchedule;
