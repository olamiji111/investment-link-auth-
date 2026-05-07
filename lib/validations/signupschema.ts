import { z } from "zod";


export const SignUpSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be atleast four characters")
        .max(50, "Name is too Long"),

    email: z
        .email("Invalid Email address"),

    password: z
        .string()
        .min(6, "Password must be at last six characters")
        .max(30, "Password is too long")
});


export const LoginSchema = z.object({
    email: z
        .email("Invalid Email address"),

    password: z
        .string()
        .min(6, "Password must be at last six characters")
        .max(30, "Password is too long")
});