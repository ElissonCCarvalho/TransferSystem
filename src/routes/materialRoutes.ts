import { Router } from "express";
import { MaterialsController } from "../controllers/MaterialsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const materialRoutes = Router();

const materialsController = new MaterialsController();

materialRoutes.post("/materials/register", ensureAuthenticated, materialsController.create);
materialRoutes.get("/materials/:id", ensureAuthenticated, materialsController.show);
materialRoutes.post("/materials", ensureAuthenticated, materialsController.list);
materialRoutes.patch("/materials/:id", ensureAuthenticated, materialsController.update);
materialRoutes.delete("/materials/:id", ensureAuthenticated, materialsController.activateAndDisable);

export { materialRoutes }