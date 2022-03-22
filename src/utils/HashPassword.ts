import crypto from "crypto";

class HashPassword {

    async hash(password: string) {
        const hash = await new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ":" + derivedKey.toString('hex'))
            });
        }).then((value: string) => {
            password = value;
        })
        return password;
    }

    async verify(password: string, hash: string) {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    }
}

export { HashPassword }