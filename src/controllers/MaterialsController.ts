import { Request, Response } from "express";
import { MaterialsService } from "../services/MaterialsService";

class MaterialsController {
    async create(request: Request, response: Response) {
        const { name, description, measureInuity, price, isActive } = request.body;

        const materialService = new MaterialsService();

        const material = await materialService.create({ name, description, measureInuity, price, isActive });

        return response.json(material);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const materialService = new MaterialsService();

        const material = await materialService.show({ id });

        return response.json(material);
    }

    async list(request: Request, response: Response) {
        const materialService = new MaterialsService();

        const sector = await materialService.list();

        return response.json(sector);
    }

    async update(request: Request, response: Response) {
        const { name, description, measureInuity, price, isActive } = request.body;
        const { id } = request.params

        const materialService = new MaterialsService();

        if (name) var sector = await materialService.updateName({ id, name });
        if (description) var sector = await materialService.updateDescription({ id, description });
        if (measureInuity) var sector = await materialService.updateMeasureInuity({ id, measureInuity });
        if (price) var sector = await materialService.updatePrice({ id, price });

        return response.json(sector);
    }

    async activateAndDisable(request: Request, response: Response) {
        const { password } = request.body;
        const { id } = request.params
        const { user_id } = request

        const materialService = new MaterialsService();

        const sector = await materialService.activateAndDisable({ id, password, user_id });

        return response.json(sector);
    }
}

export { MaterialsController }