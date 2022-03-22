import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("materials")
class Material {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    measureInuity: string;

    @Column()
    price: number;

    @Column()
    isActive: boolean;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { Material }