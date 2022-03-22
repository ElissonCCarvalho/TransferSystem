import { Request, Response } from "express";
import { SectorsService } from "../services/SectorsService";

class SectorsController {
    async create(request: Request, response: Response) {
        const { name, description, abbreviation } = request.body;

        const sectorService = new SectorsService();

        const sector = await sectorService.create({ name, description, abbreviation });

        return response.json(sector);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const sectorService = new SectorsService();

        const sector = await sectorService.show(id);

        return response.json(sector);
    }

    async list(request: Request, response: Response) {
        const sectorService = new SectorsService();

        const sector = await sectorService.list();

        return response.json(sector);
    }

    async update(request: Request, response: Response) {
        const { name, abbreviation, description } = request.body;
        const { id } = request.params

        const sectorService = new SectorsService();

        if (name) var sector = await sectorService.updateName({ id, name });
        if (description) var sector = await sectorService.updateDescription({ id, description });
        if (abbreviation) var sector = await sectorService.updateAbbreviation({ id, abbreviation });

        return response.json(sector);
    }

    async delete(request: Request, response: Response) {
        const { password } = request.body;
        const { id } = request.params
        const { user_id } = request

        const sectorService = new SectorsService();

        const sector = await sectorService.delete({ id, password, user_id });

        return response.json(sector);
    }
}

export { SectorsController }