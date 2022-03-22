import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSector1632665598344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "sectors",
            columns: [
                { name: "id", type: "varchar(36)", isPrimary: true },
                { name: "name", type: "varchar(36)" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "abbreviation", type: "varchar(36)" },
            ]
        }));

        /* await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Sector)
            .values([
                { id: uuid(), name: "Admin", description: "Admin Sector", abbreviation: "Admin" },
            ])
            .execute(); */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sectors");
    }

}
