import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";
import { Sector } from "./Sector";

@Entity("employees")
class Employee {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @JoinColumn({ name: "sector_id" })
    @ManyToOne(() => Sector)
    sector: Sector

    @JoinColumn({ name: "user_id" })
    @OneToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @Column()
    sector_id: string

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Employee }