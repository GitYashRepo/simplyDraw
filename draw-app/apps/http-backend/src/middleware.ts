import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface CustomRequest extends Request {
    userId?: string;
}

export function middleware(req:Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded){
        (req as CustomRequest).userId = (decoded as any).userId;
    } else {
        res.status(403).json({
            message:"Unauthorized"
        });
    }
    next();
}
