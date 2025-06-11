import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

// Extend Express Request interface to include userId
declare module "express" {
    interface Request {
        userId?: string;
    }
}

export function middleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers["authorization"] ?? "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        if (decoded && decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
        }
    } catch (err) {
        res.status(403).json({ message: "Unauthorized" });
    }
}
