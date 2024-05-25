import {MigrationInterface, QueryRunner} from "typeorm";

export class asdasd1716259527002 implements MigrationInterface {
    name = 'asdasd1716259527002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, CONSTRAINT "UQ_3eeef6c2186d2bd1b4c22202ed2" UNIQUE ("url"))`);
        await queryRunner.query(`CREATE TABLE "portfolio_version_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "versionType" varchar NOT NULL, "portfolioId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "page_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "versionId" integer NOT NULL, CONSTRAINT "UQ_df5aeb76925a85fe7880bfc9724" UNIQUE ("url"))`);
        await queryRunner.query(`CREATE TABLE "temporary_portfolio_version_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "versionType" varchar NOT NULL, "portfolioId" integer NOT NULL, CONSTRAINT "FK_bb1c57b552c1a2b7584e54143d6" FOREIGN KEY ("portfolioId") REFERENCES "portfolio_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_portfolio_version_entity"("id", "versionType", "portfolioId") SELECT "id", "versionType", "portfolioId" FROM "portfolio_version_entity"`);
        await queryRunner.query(`DROP TABLE "portfolio_version_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_portfolio_version_entity" RENAME TO "portfolio_version_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_page_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "versionId" integer NOT NULL, CONSTRAINT "UQ_df5aeb76925a85fe7880bfc9724" UNIQUE ("url"), CONSTRAINT "FK_52de06a7d957301c115e4d97547" FOREIGN KEY ("versionId") REFERENCES "portfolio_version_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_page_entity"("id", "name", "url", "versionId") SELECT "id", "name", "url", "versionId" FROM "page_entity"`);
        await queryRunner.query(`DROP TABLE "page_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_page_entity" RENAME TO "page_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page_entity" RENAME TO "temporary_page_entity"`);
        await queryRunner.query(`CREATE TABLE "page_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "url" varchar NOT NULL, "versionId" integer NOT NULL, CONSTRAINT "UQ_df5aeb76925a85fe7880bfc9724" UNIQUE ("url"))`);
        await queryRunner.query(`INSERT INTO "page_entity"("id", "name", "url", "versionId") SELECT "id", "name", "url", "versionId" FROM "temporary_page_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_page_entity"`);
        await queryRunner.query(`ALTER TABLE "portfolio_version_entity" RENAME TO "temporary_portfolio_version_entity"`);
        await queryRunner.query(`CREATE TABLE "portfolio_version_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "versionType" varchar NOT NULL, "portfolioId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "portfolio_version_entity"("id", "versionType", "portfolioId") SELECT "id", "versionType", "portfolioId" FROM "temporary_portfolio_version_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_portfolio_version_entity"`);
        await queryRunner.query(`DROP TABLE "page_entity"`);
        await queryRunner.query(`DROP TABLE "portfolio_version_entity"`);
        await queryRunner.query(`DROP TABLE "portfolio_entity"`);
    }

}
