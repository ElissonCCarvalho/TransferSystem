import { getCustomRepository, Repository } from 'typeorm';

import { Transfer } from '../entities/Transfer';
import { User } from '../entities/User';

import { TransfersRepository } from "../repositories/TransfersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface ITransferCreate {
    employee_id: string,
    destinationSector_id: string,
    originSector_id: string,
    status: string,
    description: string,
}

class TransfersService {
    //private employeeRepository: Repository<Employee>;
    private userRepository: Repository<User>;
    private transferRepository: Repository<Transfer>;

    constructor() {
        this.transferRepository = getCustomRepository(TransfersRepository);
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create({ employee_id, destinationSector_id, originSector_id, status, description }: ITransferCreate) {
        const trasnfer = this.transferRepository.create({ employee_id, destinationSector_id, originSector_id, status, description });

        await this.transferRepository.save(trasnfer);

        return trasnfer;
    }
}

export { TransfersService }