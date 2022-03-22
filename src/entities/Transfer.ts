import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { Sector } from "./Sector";
import { Employee } from "./Employee";

@Entity("transfers")
class Transfer {

    @PrimaryGeneratedColumn()
    id: string;

    @JoinColumn({ name: "employee_id" })
    @ManyToOne(() => Employee)
    employee: Employee

    @JoinColumn({ name: "destinationSector_id" })
    @ManyToOne(() => Sector)
    destinationSector: Sector

    @JoinColumn({ name: "originSector_id" })
    @ManyToOne(() => Sector)
    originSector: Sector

    @Column()
    employee_id: string

    @Column()
    destinationSector_id: string

    @Column()
    originSector_id: string

    @Column()
    status: string;

    @Column()
    description: string;

    @CreateDateColumn()
    date: Date;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Transfer }