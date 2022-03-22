import { Router } from "express";
import { SectorsController } from "../controllers/SectorsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const sectorRoutes = Router();

const sectorsController = new SectorsController();

sectorRoutes.post("/sectors/register", ensureAuthenticated, ensureAdmin, sectorsController.create);
sectorRoutes.get("/sectors/:id", ensureAuthenticated, sectorsController.show);
sectorRoutes.get("/sectors", ensureAuthenticated, sectorsController.list);
sectorRoutes.patch("/sectors/:id", ensureAuthenticated, sectorsController.update);
sectorRoutes.delete("/sectors/:id", ensureAuthenticated, ensureAdmin, sectorsController.delete);

export { sectorRoutes }