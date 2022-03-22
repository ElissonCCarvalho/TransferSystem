import { EntityRepository, Repository } from "typeorm";
import { Sector } from "../entities/Sector";

@EntityRepository(Sector)
class SectorsRepository extends Repository<Sector> {

}

export { SectorsRepository };