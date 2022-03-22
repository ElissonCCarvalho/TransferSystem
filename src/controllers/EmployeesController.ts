import { Request, Response } from "express";
import { EmployeesService } from "../services/EmployeesService";
import { UsersService } from "../services/UsersService";

class EmployeesController {
    async create(request: Request, response: Response) {
        const { name, email, accessLevel, sector_id, login, password } = request.body;

        const employeeService = new EmployeesService();
        const userService = new UsersService();

        const user = await userService.create({ login, password, accessLevel });

        const employee = await employeeService.create({ name, email, sector_id, user_id: user.id });

        return response.json({ employee });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const employeeService = new EmployeesService();
        const userService = new UsersService();

        const employee = await employeeService.show({ id });

        employee.user = await userService.show(employee.user_id);

        return response.json(employee);
    }

    async list(request: Request, response: Response) {
        const employeeService = new EmployeesService();

        const employee = await employeeService.list();

        return response.json(employee);
    }

    async update(request: Request, response: Response) {
        const { name, email } = request.body;
        const { id } = request.params

        const employeeService = new EmployeesService();

        const employee = await employeeService.update({ id, name, email });

        return response.json(employee);
    }

    async delete(request: Request, response: Response) {
        const { password } = request.body;
        const { id } = request.params

        const employeeService = new EmployeesService();

        const employee = await employeeService.delete({ id, password });

        return response.json(employee);
    }
}

export { EmployeesController }