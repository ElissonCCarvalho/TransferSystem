import { EntityRepository, Repository } from "typeorm";
import { MaterialSector } from "../entities/MaterialSector";

@EntityRepository(MaterialSector)
class MaterialSectorsRepository extends Repository<MaterialSector> {

}

export { MaterialSectorsRepository };