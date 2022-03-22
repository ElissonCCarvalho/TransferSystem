import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("sectors")
class Sector {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    abbreviation: string;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Sector }