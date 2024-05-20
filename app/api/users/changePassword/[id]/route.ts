import { hashPassword } from '@/app/utils/hash'
import { changePasswordSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const user = await prisma.user.findUnique({
        where: { id: params.id }
    })
    if (!user)
        return NextResponse.json({ error: 'Invalid user.'}, { status: 404 })

    const body = await request.json()
    const validation = changePasswordSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const hashedPassword = hashPassword(body.currentPassword).toString()
    if (hashedPassword !== user.password)
        return NextResponse.json({ error: 'Password does not match' }, { status: 400 })

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashPassword(body.newPassword).toString() }
    })

    return NextResponse.json({})
}