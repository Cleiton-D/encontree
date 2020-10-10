import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDisabledToWorkSchedule1602292650661
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'work_schedules',
      new TableColumn({
        name: 'disabled',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('work_schedules', 'disabled');
  }
}
