import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddProductCollectionStoreId1703252420411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_collection" ADD "store_id" character varying`)
    await queryRunner.query(`CREATE INDEX "CollectionStoreId" ON "product" ("store_id") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."CollectionStoreId"`)
    await queryRunner.query(`ALTER TABLE "product_collection" DROP COLUMN "store_id"`)
  }
}
