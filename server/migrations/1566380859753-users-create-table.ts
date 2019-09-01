import { MigrationInterface, QueryRunner } from 'typeorm';

/* tslint:disable:class-name */
export class usersCreateTable1566380859753 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(100) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                salt TEXT NOT NULL,
                "emailValidatedAt" TIMESTAMP,
                "role" VARCHAR(50) DEFAULT 'customer',
                "flags" JSONB DEFAULT '[]' :: JSONB,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP,
                "deletedAt" TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            DROP TABLE users;
        `);
    }
}
