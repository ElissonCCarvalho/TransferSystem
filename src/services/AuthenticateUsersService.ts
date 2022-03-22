import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword"

interface IAuthenticateRequest {
    login: string;
    password: string;
}

class AuthenticateUsersService {
    async execute({ login, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ login });

        if (!user) {
            throw new Error("User incorrect");
        }

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) {
            throw new Error("Password incorrect");
        }

        const token = sign(
            {
                login: user.login,
            },
            process.env.TOKEN_KEY,
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );

        return token;
    }
}

export { AuthenticateUsersService };