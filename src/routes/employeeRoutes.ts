import { Router } from "express";
import { EmployeesController } from "../controllers/EmployeesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const employeeRoutes = Router();

const employeesController = new EmployeesController();

employeeRoutes.post("/employees/register", ensureAuthenticated, employeesController.create);
employeeRoutes.get("/employees/:id", ensureAuthenticated, employeesController.show);
employeeRoutes.get("/employees", ensureAuthenticated, employeesController.list);
employeeRoutes.patch("/employees/update/:id", ensureAuthenticated, employeesController.update);
employeeRoutes.delete("/employees/delete/:id", ensureAuthenticated, employeesController.delete);

export { employeeRoutes }