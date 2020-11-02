import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDefaultToCreatedAtAndUpdatedAtFromSchedule1604327171144
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'schedules',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.changeColumn(
      'schedules',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'schedules',
      'created_at',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
      }),
    );

    await queryRunner.changeColumn(
      'schedules',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
      }),
    );
  }
}
