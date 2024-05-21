import { hashPassword } from '@/app/utils/hash'
import { registerUserSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = registerUserSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })
    if (user)
        return NextResponse.json(
            { error: 'A user with the given username already exists.'}, 
            { status: 400 }
        )
    
    const { password, ...newUser } = await prisma.user.create({
        data: {
            name: body.name,
            username: body.username,
            password: hashPassword(body.password).toString()
        }
    })

    return NextResponse.json({ newUser }, { status: 201 })
}