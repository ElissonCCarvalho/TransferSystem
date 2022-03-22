import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface IusersCreate { login: string, password: string, accessLevel: number, }
interface IusersUpdate { id: string, newPassword: string, oldPassword: string, }

class UsersService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create({ login, password, accessLevel }: IusersCreate) {
        const userExists = await this.userRepository.findOne({ login });

        if (userExists) throw new Error("User already exists");

        const hashPassword = await new HashPassword().hash(password);

        const user = this.userRepository.create({ login, password: hashPassword, accessLevel });

        await this.userRepository.save(user);

        return user;
    }

    async show(id: string) {
        const user = await this.userRepository.findOne({ id });

        if (!user) throw new Error("User not exists");

        return user;
    }

    async list() {
        const users = await this.userRepository.find();

        return users;
    }

    async updatePassword({ id, oldPassword, newPassword }: IusersUpdate) {
        const user = await this.userRepository.findOne({ id });

        if (!user) throw new Error("User not exists");

        const passwordMatch = await new HashPassword().verify(oldPassword, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.userRepository.update({
            id,
        }, {
            password: await new HashPassword().hash(newPassword),
        });
    }

    async delete({ id, password }) {
        const user = await this.userRepository.findOne({ id });

        if (!user) throw new Error("User not exists");

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.userRepository.delete({ id });
    }
}

export { UsersService }