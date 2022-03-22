import { Router } from "express";
import { MaterialSectorsController } from "../controllers/MaterialSectorsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const materialSectorRoutes = Router();

const materialSectorsController = new MaterialSectorsController();

materialSectorRoutes.post("/stocks/register", ensureAuthenticated, materialSectorsController.create);
materialSectorRoutes.get("/stocks/:id", ensureAuthenticated, materialSectorsController.show);
materialSectorRoutes.get("/stocks", ensureAuthenticated, materialSectorsController.list);
//materialSectorRoutes.patch("/stocks/:id", ensureAuthenticated, materialSectorsController.update);
materialSectorRoutes.delete("/stocks/:id", ensureAuthenticated, materialSectorsController.delete);

export { materialSectorRoutes }