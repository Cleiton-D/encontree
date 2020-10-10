import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUsernameToUser1602352598174
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'username', type: 'varchar' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }
}
