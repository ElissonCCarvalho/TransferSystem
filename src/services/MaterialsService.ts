import { getCustomRepository, Repository } from 'typeorm';
import { Material } from '../entities/Material';
import { User } from '../entities/User';

import { MaterialsRepository } from "../repositories/MaterialsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface IMaterialsCreate { name: string, description: string, measureInuity: string, price: number, isActive: boolean }
interface IMaterialUpdateName { id: string, name: string }
interface IMaterialUpdateDescription { id: string, description: string }
interface IMaterialUpdateMeasureInuity { id: string, measureInuity: string }
interface IMaterialUpdatePrice { id: string, price: number }
interface IMaterialActivateAndDisable { id: string, password: string, user_id: string }

class MaterialsService {
    private materialRepository: Repository<Material>;
    private userRepository: Repository<User>;

    constructor() {
        this.materialRepository = getCustomRepository(MaterialsRepository);
        this.userRepository = getCustomRepository(UsersRepository);

    }

    async create({ name, description, measureInuity, price, isActive }: IMaterialsCreate) {
        const materialExists = await this.materialRepository.findOne({ name });

        if (materialExists) {
            if (!materialExists.isActive) {
                await this.materialRepository.update({ name }, { isActive: true });
                const material = await this.materialRepository.findOne({ name });

                return material;
            }
            throw new Error('Material already existes');
        }
        const newMaterial = this.materialRepository.create({ name, description, measureInuity, price, isActive });

        await this.materialRepository.save(newMaterial);

        return newMaterial;
    }

    async show({ id }) {
        const material = await this.materialRepository.findOne({ id });

        if (!material || !material.isActive) throw new Error('Material not existes');

        return material;
    }

    async list() {
        const materials = await this.materialRepository.find({ where: { isActive: true } });

        return materials;
    }

    async updateName({ id, name }: IMaterialUpdateName) {
        const material = await this.materialRepository.findOne({ id });

        if (!material) throw new Error("material not exists");

        return await this.materialRepository.update({ id }, { name });
    }

    async updateDescription({ id, description }: IMaterialUpdateDescription) {
        const material = await this.materialRepository.findOne({ id });

        if (!material) throw new Error("material not exists");

        return await this.materialRepository.update({ id }, { description });
    }

    async updateMeasureInuity({ id, measureInuity }: IMaterialUpdateMeasureInuity) {
        const material = await this.materialRepository.findOne({ id });

        if (!material) throw new Error("material not exists");

        return await this.materialRepository.update({ id }, { measureInuity });
    }

    async updatePrice({ id, price }: IMaterialUpdatePrice) {
        const material = await this.materialRepository.findOne({ id });

        if (!material) throw new Error("material not exists");

        return await this.materialRepository.update({ id }, { price });
    }

    async delete({ id }) {
        const material = await this.materialRepository.findOne({ id });

        if (!material) throw new Error("Material not exists");

        return await this.materialRepository.delete({ id });
    }

    async activateAndDisable({ id, password, user_id }: IMaterialActivateAndDisable) {
        const material = await this.materialRepository.findOne({ id });

        if (!material || !material.isActive) throw new Error("Material not exists");

        const user = await this.userRepository.findOne({ id: user_id })

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.materialRepository.update({ id }, { isActive: false });
    }
}

export { MaterialsService }