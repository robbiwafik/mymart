import { categorySchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const categories = await prisma.category.findMany()

    return NextResponse.json(categories)
}

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