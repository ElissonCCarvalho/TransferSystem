import express from 'express';
import { getConnection } from 'typeorm';

import { SectorsService } from "../services/SectorsService";
import { UsersService } from "../services/UsersService";
import { EmployeesService } from "../services/EmployeesService";

class CreateDefaultUser {

    async create() {
        const sectorService = new SectorsService();
        const userService = new UsersService();
        const employeeService = new EmployeesService();

        const defaultSector = { name: "Default", description: "Default sector ", abbreviation: "DFLT" }
        const defaultUser = { login: "Admin", password: "admin", accessLevel: 0 }

        const sector = await sectorService.create(defaultSector);
        const user = await userService.create(defaultUser);

        const defaultmployee = { name: "Default", email: "test@test.com", accessLevel: 0, sector_id: sector.id, user_id: user.id }

        await employeeService.create(defaultmployee);
    }
}

export { CreateDefaultUser }


