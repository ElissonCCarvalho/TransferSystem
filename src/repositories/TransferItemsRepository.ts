import { EntityRepository, Repository } from "typeorm";
import { TransferItem } from "../entities/TransferItem";

@EntityRepository(TransferItem)
class TransfersItemsRepository extends Repository<TransferItem> {

}

export { TransfersItemsRepository };