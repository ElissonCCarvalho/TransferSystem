import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMaterial1632607648527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "materials",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "name", type: "varchar(36)" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "measureInuity", type: "varchar(36)", },
                { name: "price", type: "double", },
                { name: "isActive", type: "boolean", default: true },
            ]
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("materials");
    }

}
