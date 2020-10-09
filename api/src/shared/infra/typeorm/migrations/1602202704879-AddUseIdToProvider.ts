import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUseIdToProvider1602202704879
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'providers',
      new TableColumn({ name: 'user_id', type: 'uuid' }),
    );

    await queryRunner.createForeignKey(
      'providers',
      new TableForeignKey({
        name: 'ProviderUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('providers', 'ProviderUser');
    await queryRunner.dropColumn('providers', 'user_id');
  }
}
