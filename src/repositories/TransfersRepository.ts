import { EntityRepository, Repository } from "typeorm";
import { Transfer } from "../entities/Transfer";

@EntityRepository(Transfer)
class TransfersRepository extends Repository<Transfer> {

}

export { TransfersRepository };