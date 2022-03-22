import { getCustomRepository, Repository } from 'typeorm';

import { MaterialSector } from '../entities/MaterialSector';
import { Material } from '../entities/Material';
import { User } from '../entities/User';

import { MaterialSectorsRepository } from "../repositories/MaterialSectorsRepository";
import { MaterialsRepository } from "../repositories/MaterialsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface IMaterialSectorCreate { sector_id: string, material_id: string, quantity: number }
interface IMaterialSectorDelete { id: string, password: string, user_id: string }

class MaterialSectorsService {
    private materialSectorRepository: Repository<MaterialSector>;
    private materialRepository: Repository<Material>;
    private userRepository: Repository<User>;

    constructor() {
        this.materialSectorRepository = getCustomRepository(MaterialSectorsRepository);
        this.materialRepository = getCustomRepository(MaterialsRepository);
        this.userRepository = getCustomRepository(UsersRepository);

    }

    async create({ sector_id, material_id, quantity }: IMaterialSectorCreate) {

        const stockExists = await this.materialSectorRepository.findOne({ where: { sector_id, material_id } });

        const material = await this.materialRepository.findOne(
            { where: { id: material_id, isActive: true } }
        );

        if (!material) {
            throw new Error('Material not exists');
        }

        if (stockExists) {
            this.materialSectorRepository.update(
                { id: stockExists.id },
                { quantity: stockExists.quantity += quantity }
            );

            return stockExists
        }

        const materialSector = this.materialSectorRepository.create({ sector_id, material_id, quantity });

        await this.materialSectorRepository.save(materialSector);

        return materialSector;
    }

    async show({ id }) {
        const stock = await this.materialSectorRepository.findOne({ id });

        if (!stock) throw new Error('Stock not existes');

        return stock;
    }

    async list() {
        const stocks = await this.materialSectorRepository.find();

        return stocks;
    }

    async delete({ id, password, user_id }: IMaterialSectorDelete) {
        const stock = await this.materialSectorRepository.findOne({ id });

        if (!stock) throw new Error("Stock not exists");

        const user = await this.userRepository.findOne({ id: user_id })

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.materialSectorRepository.delete({ id });
    }
}

export { MaterialSectorsService }