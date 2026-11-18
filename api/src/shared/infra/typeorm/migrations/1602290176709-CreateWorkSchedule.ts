import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { UUID_DEFAULT } from '../uuid-default';

export default class CreateWorkSchedule1602290176709
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'work_schedules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: UUID_DEFAULT,
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'day',
            type: 'enum',
            enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
          },
          {
            name: 'inicio',
            type: 'integer',
          },
          {
            name: 'fim',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'WorkSchedulesProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'providers',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('work_schedules', 'WorkSchedulesProvider');
    await queryRunner.dropTable('work_schedules');
  }
}
