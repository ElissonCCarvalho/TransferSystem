import express, { Request, Response, NextFunction } from "express";

import { materialRoutes } from "./routes/materialRoutes";
import { sectorRoutes } from "./routes/sectorRoutes";
import { employeeRoutes } from "./routes/employeeRoutes";
import { authRoutes } from "./routes/authRoutes";
import { materialSectorRoutes } from "./routes/materialSectorRoutes";
import { transferRoutes } from "./routes/transferRoutes";

import "./database";

const app = express();

app.use(express.json());

app.use(materialRoutes);
app.use(sectorRoutes);
app.use(employeeRoutes);
app.use(authRoutes);
app.use(materialSectorRoutes);
app.use(transferRoutes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                error: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
);

app.listen(3334);