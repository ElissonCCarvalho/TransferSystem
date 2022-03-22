import { getCustomRepository, Repository } from 'typeorm';

import { MaterialSector } from '../entities/MaterialSector';
import { TransferItem } from '../entities/TransferItem';

import { TransfersItemsRepository } from "../repositories/TransferItemsRepository";
import { MaterialSectorsRepository } from "../repositories/MaterialSectorsRepository";

interface IItemCreate {
    transfer_id: string,
    material_id: string,
    quantity: number,
}

class TransferItemsService {

    private materilSectorRepository: Repository<MaterialSector>;
    private transferItemRepository: Repository<TransferItem>;

    constructor() {
        this.materilSectorRepository = getCustomRepository(MaterialSectorsRepository);
        this.transferItemRepository = getCustomRepository(TransfersItemsRepository);
    }

    async create({ transfer_id, material_id, quantity }: IItemCreate) {
        const stock = await this.materilSectorRepository.findOne({ id: material_id });

        console.log(material_id)

        if (!stock) throw new Error('Stock not exists');

        if (stock.quantity < quantity) throw new Error('There is no insufficient stock');

        const trasnferItem = this.transferItemRepository.create({ transfer_id, material_id, quantity });

        await this.transferItemRepository.save(trasnferItem);

        return trasnferItem;
    }
}

export { TransferItemsService }