import { getCustomRepository, Repository } from 'typeorm';

import { Sector } from '../entities/Sector';
import { User } from '../entities/User';

import { SectorsRepository } from "../repositories/SectorsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface ISectorsCreate { name: string, description: string, abbreviation: string }
interface ISectorsUpdateName { id: string, name: string }
interface ISectorsUpdateDescription { id: string, description: string, }
interface ISectorsUpdateAbbreviation { id: string, abbreviation: string }

interface ISectorsDelete { id: string, password: string, user_id: string }

class SectorsService {
    private sectorRepository: Repository<Sector>;
    private userRepository: Repository<User>;

    constructor() {
        this.sectorRepository = getCustomRepository(SectorsRepository);
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create({ name, description, abbreviation }: ISectorsCreate) {
        const sectorExists = await this.sectorRepository.findOne({ name });

        if (sectorExists) throw new Error("Sector alread exists");

        const sector = this.sectorRepository.create({ name, description, abbreviation });

        await this.sectorRepository.save(sector);

        return sector;
    }

    async show(id: string) {
        const sector = await this.sectorRepository.findOne({ id });

        if (!sector) throw new Error("Sector not exists");

        return sector;
    }

    async list() {
        const sectors = await this.sectorRepository.find();

        return sectors;
    }

    async updateName({ id, name }: ISectorsUpdateName) {
        const sector = await this.sectorRepository.findOne({ id });

        if (!sector) throw new Error("Sector not exists");

        return await this.sectorRepository.update({ id }, { name });
    }

    async updateDescription({ id, description }: ISectorsUpdateDescription) {
        const sector = await this.sectorRepository.findOne({ id });

        if (!sector) throw new Error("Sector not exists");

        return await this.sectorRepository.update({ id }, { description });
    }

    async updateAbbreviation({ id, abbreviation }: ISectorsUpdateAbbreviation) {
        const sector = await this.sectorRepository.findOne({ id });

        if (!sector) throw new Error("Sector not exists");

        return await this.sectorRepository.update({ id }, { abbreviation });
    }

    async delete({ id, password, user_id }: ISectorsDelete) {
        const sector = await this.sectorRepository.findOne({ id });

        if (!sector) throw new Error("sector not exists");

        const user = await this.userRepository.findOne({ id: user_id })

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.sectorRepository.delete({ id });
    }
}

export { SectorsService }