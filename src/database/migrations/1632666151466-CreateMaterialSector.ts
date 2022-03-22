import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMaterialSector1632666151466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "material_sectors",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "sector_id", type: "varchar(36)" },
                { name: "material_id", type: "varchar(36)" },
                { name: "quantity", type: "double" },
            ],
            foreignKeys: [
                {
                    name: "FKSectorM",
                    referencedTableName: "sectors",
                    referencedColumnNames: ["id"],
                    columnNames: ["sector_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "FKMaterialM",
                    referencedTableName: "materials",
                    referencedColumnNames: ["id"],
                    columnNames: ["material_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("material_sectors");
    }

}
