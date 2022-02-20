import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsMigration1645400147326 implements MigrationInterface {
    name = 'TestsMigration1645400147326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_m5" ("uid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "notes_m5" ("uid" varchar PRIMARY KEY NOT NULL, "description" varchar(50) NOT NULL, "detail" varchar(500) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userUidUid" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_notes_m5" ("uid" varchar PRIMARY KEY NOT NULL, "description" varchar(50) NOT NULL, "detail" varchar(500) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userUidUid" varchar, CONSTRAINT "FK_bde0a4b925349353365dcd0b990" FOREIGN KEY ("userUidUid") REFERENCES "users_m5" ("uid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_notes_m5"("uid", "description", "detail", "created_at", "updated_at", "userUidUid") SELECT "uid", "description", "detail", "created_at", "updated_at", "userUidUid" FROM "notes_m5"`);
        await queryRunner.query(`DROP TABLE "notes_m5"`);
        await queryRunner.query(`ALTER TABLE "temporary_notes_m5" RENAME TO "notes_m5"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_m5" RENAME TO "temporary_notes_m5"`);
        await queryRunner.query(`CREATE TABLE "notes_m5" ("uid" varchar PRIMARY KEY NOT NULL, "description" varchar(50) NOT NULL, "detail" varchar(500) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userUidUid" varchar)`);
        await queryRunner.query(`INSERT INTO "notes_m5"("uid", "description", "detail", "created_at", "updated_at", "userUidUid") SELECT "uid", "description", "detail", "created_at", "updated_at", "userUidUid" FROM "temporary_notes_m5"`);
        await queryRunner.query(`DROP TABLE "temporary_notes_m5"`);
        await queryRunner.query(`DROP TABLE "notes_m5"`);
        await queryRunner.query(`DROP TABLE "users_m5"`);
    }

}
