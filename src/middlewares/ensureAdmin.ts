import { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request;

    const usersRepository = getCustomRepository(UsersRepository);

    const { accessLevel } = await usersRepository.findOne(user_id);

    if (accessLevel == 0) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized",
    });
}