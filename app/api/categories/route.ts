import { NextRequest, NextResponse } from 'next/server'
import { categorySchema } from './validationSchema'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = categorySchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const newCategory = await prisma.category.create({
        data: {
            name: body.name
        }
    })

    return NextResponse.json(newCategory, { status: 201 })
}