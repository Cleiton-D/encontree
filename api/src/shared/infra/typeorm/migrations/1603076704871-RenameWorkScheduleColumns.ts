import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RenameWorkScheduleColumns1603076704871
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('work_schedules', 'inicio', 'start');
    await queryRunner.renameColumn('work_schedules', 'fim', 'end');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('work_schedules', 'start', 'inicio');
    await queryRunner.renameColumn('work_schedules', 'end', 'fim');
  }
}
