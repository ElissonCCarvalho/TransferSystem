import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1632664035712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "login", type: "varchar(36)" },
                { name: "password", type: "varchar" },
                { name: "accessLevel", type: "int" },
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
