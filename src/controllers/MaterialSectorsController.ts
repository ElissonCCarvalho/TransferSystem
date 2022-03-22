import { Request, Response } from "express";
import { MaterialSectorsService } from "../services/MaterialSectorsService";
import { MaterialsService } from "../services/MaterialsService";

class MaterialSectorsController {
    async create(request: Request, response: Response) {
        const { sector_id, material_id, quantity } = request.body;

        const materialSectorService = new MaterialSectorsService();

        const materialSector = await materialSectorService.create({ sector_id, material_id, quantity });

        return response.json(materialSector);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const materialSectorService = new MaterialSectorsService();
        const materialService = new MaterialsService();

        const materialSector = await materialSectorService.show({ id });

        materialSector.material = await materialService.show({ id: materialSector.material_id })

        return response.json(materialSector);
    }

    async list(request: Request, response: Response) {
        const materialSectorService = new MaterialSectorsService();

        const materialSector = await materialSectorService.list();

        return response.json(materialSector);
    }

    async delete(request: Request, response: Response) {
        const { password } = request.body;
        const { id } = request.params
        const { user_id } = request

        const materialSectorService = new MaterialSectorsService();

        const sector = await materialSectorService.delete({ id, password, user_id });

        return response.json(sector);
    }
}

export { MaterialSectorsController }