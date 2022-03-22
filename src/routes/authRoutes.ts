import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AutenticateUsersController";

const authRoutes = Router();

const authController = new AuthenticateUserController();

authRoutes.post("/login", authController.handle);

export { authRoutes }