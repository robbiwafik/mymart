import { NextRequest, NextResponse } from 'next/server'
import { categorySchema } from '../validationSchema'
import prisma from '@/prisma/client'

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json()
    const validation = categorySchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const category = await prisma.category.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!category)
        return NextResponse.json({ error: 'Invalid category.' }, { status: 404 })

    const updatedCategory = await prisma.category.update({
        where: { id: category.id },
        data: { name: body.name }
    })

    return NextResponse.json(updatedCategory)
}