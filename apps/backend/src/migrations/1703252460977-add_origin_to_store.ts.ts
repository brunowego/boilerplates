import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddOriginToStore1703252460977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "store" ADD "origin" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "origin"`)
  }
}
