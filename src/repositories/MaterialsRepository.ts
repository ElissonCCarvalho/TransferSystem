import { EntityRepository, Repository } from "typeorm";
import { Material } from "../entities/Material";

@EntityRepository(Material)
class MaterialsRepository extends Repository<Material> {

}

export { MaterialsRepository };