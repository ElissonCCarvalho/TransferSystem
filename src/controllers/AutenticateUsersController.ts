import { Request, Response } from "express";
import { AuthenticateUsersService } from "../services/AuthenticateUsersService";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { login, password } = request.body;

        const authenticateUserService = new AuthenticateUsersService();

        const token = await authenticateUserService.execute({
            login,
            password,
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };