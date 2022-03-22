import { EntityRepository, Repository } from "typeorm";
import { Employee } from "../entities/Employee";

@EntityRepository(Employee)
class EmployeesRepository extends Repository<Employee> {

}

export { EmployeesRepository };