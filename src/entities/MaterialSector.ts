import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { Material } from "./Material";
import { Sector } from "./Sector";

@Entity("material_sectors")
class MaterialSector {

    @PrimaryGeneratedColumn()
    id: string;

    @JoinColumn({ name: "sector_id" })
    @ManyToOne(() => Sector)
    sector: Sector

    @JoinColumn({ name: "material_id" })
    @ManyToOne(() => Material)
    material: Material

    @Column()
    sector_id: string

    @Column()
    material_id: string

    @Column()
    quantity: number;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { MaterialSector }