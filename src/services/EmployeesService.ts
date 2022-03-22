import { getCustomRepository, Repository } from 'typeorm';
import { Employee } from '../entities/Employee';
import { User } from '../entities/User';

import { EmployeesRepository } from "../repositories/EmployeesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

import { HashPassword } from "../utils/HashPassword";

interface IEmployeesCreate { name: string, email: string, sector_id: string, user_id: string }
interface IEmployeesUpdate { id: string, name: string, email: string }
interface IEmployeesDelete { id: string, password: string }

class EmployeesService {
    private employeeRepository: Repository<Employee>;
    private userRepository: Repository<User>;

    constructor() {
        this.employeeRepository = getCustomRepository(EmployeesRepository);
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create({ name, email, sector_id, user_id }: IEmployeesCreate) {
        const user = await this.userRepository.findOne({ id: user_id });

        const employee = this.employeeRepository.create({ name, email, sector_id, user });

        await this.employeeRepository.save(employee);

        return employee;
    }

    async show({ id }) {
        const employee = await this.employeeRepository.findOne({ id });

        if (!employee) throw new Error("Employee not exists");

        return employee;
    }

    async list() {
        const employees = await this.employeeRepository.find();

        return employees;
    }

    async update({ id, name, email }: IEmployeesUpdate) {
        const employee = await this.employeeRepository.findOne({ id });

        if (!employee) throw new Error("Employee not exists");

        if (!name) return await this.employeeRepository.update({ id }, { email });

        if (!email) return await this.employeeRepository.update({ id }, { name });

        return await this.employeeRepository.update({ id }, { name, email });
    }

    async delete({ id, password }: IEmployeesDelete) {
        const employee = await this.employeeRepository.findOne({ id });

        if (!employee) throw new Error("Employee not exists");

        const user = await this.userRepository.findOne({ id: employee.user_id })

        const passwordMatch = await new HashPassword().verify(password, user.password);

        if (!passwordMatch) throw new Error("Password incorrect");

        return await this.employeeRepository.delete({ id });
    }
}

export { EmployeesService }