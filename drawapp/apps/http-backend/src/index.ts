import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
app.post("/signup",(req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }
    prismaClient.user.create({
        data: {
            name: data.data.name,
            email: data.data.email,
            password: data.data.password
        }
    })
    // db call
    res.json({
        userId: "123"
    })
})

app.post("/signin",(req, res) => {
    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET as string);

    res.json({
        token
    });
})

app.post("/room", middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"Incorrect Inputs"
        })
        return;
    }

    // db call
    res.json({
        roomId: 123
    })
})

app.listen(3001);
