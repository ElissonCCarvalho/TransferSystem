import { Router } from "express";
import { TransfersController } from "../controllers/TransfersController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const transferRoutes = Router();

const transfersController = new TransfersController();

transferRoutes.post("/transfers/register", ensureAuthenticated, ensureAdmin, transfersController.create);
/*transferRoutes.get("/Transfers/:id", ensureAuthenticated, transfersController.show);
transferRoutes.get("/Transfers", ensureAuthenticated, transfersController.list);
transferRoutes.patch("/Transfers/:id", ensureAuthenticated, transfersController.update);
transferRoutes.delete("/Transfers/:id", ensureAuthenticated, ensureAdmin, transfersController.delete);
*/
export { transferRoutes }