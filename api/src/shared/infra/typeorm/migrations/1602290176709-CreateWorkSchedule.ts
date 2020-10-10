import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'day',
            type: 'enum',
            enum: ['dom', 'seg', 'ter', 'qua', 'quin', 'sex', 'sab'],
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
