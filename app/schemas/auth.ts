import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1).max(32),
    email: z.string().email(),
    password: z.string().min(8).max(30),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
});
