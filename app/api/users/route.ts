import { registerUserSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { SHA256 as sha256 } from 'crypto-js'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = registerUserSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            username: body.username,
            password: sha256(body.password).toString()
        }
    })
    const { password, ...user } = newUser

    return NextResponse.json({ user }, { status: 201 })
}