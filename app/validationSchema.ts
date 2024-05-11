import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required').max(255)
})

export const registerUserSchema = z.object({
    name: z.string().min(1).max(60),
    username: z.string().min(6).max(20),
    password: z.string()
        .min(8)
        .max(32)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        )
})

export const signInSchema = z.object({
    username: z.string().min(6).max(20),
    password: z.string()
        .min(8)
        .max(32)
})