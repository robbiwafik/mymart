import { productSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = productSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const category = await prisma.category.findUnique({
        where: { id: body.categoryId }
    })
    if (!category)
        return NextResponse.json({ error: 'Invalid category.'}, { status: 400 })
    
    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
            categoryId: body.categoryId
        }
    })

    return NextResponse.json(newProduct, { status: 201 })
}