import { PrimaryGeneratedColumn, Entity, Column, TableInheritance } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    accessLevel: number;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}

export { User }