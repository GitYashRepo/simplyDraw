import { z } from 'zod';

export const CreateUserSchema = z.object({
    username: z.string().min(1, "Username is required").max(30, "Username must be at most 20 characters long"),
    password: z.string().min(4, "Password must be at least 6 characters long"),
    name: z.string()
})

export const SignInSchema = z.object({
    username: z.string().min(1, "Username is required").max(30, "Username must be at most 20 characters long"),
    password: z.string().min(4, "Password must be at least 6 characters long"),
})

export const CreateRoomSchema = z.object({
    name: z.string().min(1, "Room name is required").max(20, "Room name must be at most 30 characters long"),
    description: z.string().optional(),
    password: z.string().optional()
})
