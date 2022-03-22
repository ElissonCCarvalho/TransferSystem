import { Request, Response } from "express";
import { TransferItemsService } from "../services/TransferItemsService";
import { TransfersService } from "../services/TransfersService";

interface IMaterials { material_id: Array<string>, quantity: Array<number> }

class TransfersController {
    async create(request: Request, response: Response) {
        const { employee_id, destinationSector_id, originSector_id, status, description } = request.body;
        const materials: IMaterials = request.body.materials;

        const transferService = new TransfersService();
        const transferItemService = new TransferItemsService();

        const trasfer = await transferService.create({ employee_id, destinationSector_id, originSector_id, status, description });

        console.log(materials)

        const transferItem = new Array();
        for (const index in materials.material_id) {
            transferItem.push(await transferItemService.create({
                transfer_id: trasfer.id,
                material_id: materials.material_id[index],
                quantity: materials.quantity[index]
            }));
        }

        return response.json(trasfer);
    }
}

export { TransfersController }