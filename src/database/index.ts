import { createConnection, getConnection, Connection } from "typeorm";

async function conect() {
    const connection: Connection = await createConnection();

    const db = getConnection();

    if (db) {
        console.log("Conection Sucessfull!");
    } else {
        ("Connection Error!");
    }
}

conect();
