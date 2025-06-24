import z from 'zod';

export const userNameValidation = z
    .string()
    .min(3, "User name must be at least 3 characters")
    .max(25, "User name must not be more than 25 characters")
    .regex(/^[a-zA-Z0-9]+$/, "User name should not contain special characters")

export const emailValidation = z
    .string()
    .email({ message: "Invalid email address" })

export const passwordValidation = z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" })

export const signUpSchema = z.object({
    userName: userNameValidation,
    email: emailValidation,
    password: passwordValidation
});