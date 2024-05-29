import { z } from 'zod'

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required').max(255)
})

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    price: z.number().min(1).max(9999),
    categoryId: z.number().min(1, 'Category is required').max(9999)
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

export const editUserSchema = z.object({
    image: z.instanceof(File).optional().nullable(),
    name: z.string().min(1).max(255)
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8).max(32),
    newPassword: z.string()
        .min(8)
        .max(32)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        )
})