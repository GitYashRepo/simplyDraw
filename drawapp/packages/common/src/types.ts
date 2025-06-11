import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
});

export const SignInSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(50),
});
