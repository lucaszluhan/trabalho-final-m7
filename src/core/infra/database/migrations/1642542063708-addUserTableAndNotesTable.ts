import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserTableAndNotesTable1642542063708 implements MigrationInterface {
    name = 'addUserTableAndNotesTable1642542063708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trabalho_final_m5"."users_m5" ("uid" uuid NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ee3a9358b0a5ccfbf240651fb0" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "trabalho_final_m5"."notes_m5" ("uid" uuid NOT NULL, "description" character varying(50) NOT NULL, "detail" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUidUid" uuid, CONSTRAINT "PK_8f7fc79cb112b7f383a1fa6268f" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "trabalho_final_m5"."notes_m5" ADD CONSTRAINT "FK_bde0a4b925349353365dcd0b990" FOREIGN KEY ("userUidUid") REFERENCES "trabalho_final_m5"."users_m5"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trabalho_final_m5"."notes_m5" DROP CONSTRAINT "FK_bde0a4b925349353365dcd0b990"`);
        await queryRunner.query(`DROP TABLE "trabalho_final_m5"."notes_m5"`);
        await queryRunner.query(`DROP TABLE "trabalho_final_m5"."users_m5"`);
    }

}
