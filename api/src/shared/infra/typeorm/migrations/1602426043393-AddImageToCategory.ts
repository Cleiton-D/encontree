import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageToCategory1602426043393
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'image');
  }
}
