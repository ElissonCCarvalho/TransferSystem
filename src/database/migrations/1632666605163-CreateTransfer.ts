import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransfer1632666605163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transfers",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "destinationSector_id", type: "varchar(36)" },
                { name: "originSector_id", type: "varchar(36)" },
                { name: "employee_id", type: "varchar(36)" },
                { name: "status", type: "varchar(36)" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "date", type: "timestamp", default: "now()" }
            ],
            foreignKeys: [
                {
                    name: "FKDestinationSector",
                    referencedTableName: "sectors",
                    referencedColumnNames: ["id"],
                    columnNames: ["destinationSector_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKOriginSector",
                    referencedTableName: "sectors",
                    referencedColumnNames: ["id"],
                    columnNames: ["originSector_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKEmployeeT",
                    referencedTableName: "employees",
                    referencedColumnNames: ["id"],
                    columnNames: ["employee_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transfers");
    }

}
