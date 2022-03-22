import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransferItem1632667175321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transfer_items",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "transfer_id", type: "varchar(36)" },
                { name: "material_id", type: "varchar(36)" },
                { name: "quantity", type: "double" },
            ],
            foreignKeys: [
                {
                    name: "FKTransferT",
                    referencedTableName: "transfers",
                    referencedColumnNames: ["id"],
                    columnNames: ["transfer_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKMaterialT",
                    referencedTableName: "material_sectors",
                    referencedColumnNames: ["id"],
                    columnNames: ["material_id"],
                    onDelete: "RESTRICT",
                    onUpdate: "RESTRICT"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transfer_items");
    }

}
