import { MigrationInterface, QueryRunner } from 'typeorm'

class addBarcodeToProduct1702909534000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product"' + ' ADD COLUMN "barcode" text')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP COLUMN "barcode"')
  }
}

export default addBarcodeToProduct1702909534000
