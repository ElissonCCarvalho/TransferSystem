import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmployee1632665860672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "employees",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "name", type: "varchar(36)" },
                { name: "email", type: "varchar" },
                { name: "user_id", type: "varchar(36)" },
                { name: "sector_id", type: "varchar(36)" },
            ],
            foreignKeys: [
                {
                    name: "FKSectorE",
                    referencedTableName: "sectors",
                    referencedColumnNames: ["id"],
                    columnNames: ["sector_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKUserE",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }

}