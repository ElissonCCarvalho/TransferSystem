import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { MaterialSector } from "./MaterialSector";
import { Transfer } from "./Transfer";

@Entity("transfer_items")
class TransferItem {

    @PrimaryGeneratedColumn()
    id: string;

    @JoinColumn({ name: "transfer_id" })
    @ManyToOne(() => Transfer)
    transfer: Transfer

    @JoinColumn({ name: "material_id" })
    @ManyToOne(() => MaterialSector)
    material: MaterialSector

    @Column()
    transfer_id: string;

    @Column()
    material_id: string;

    @Column()
    quantity: number;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { TransferItem }