import { productSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
	params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
	const product = await prisma.product.findUnique({
		where: { id: params.id }
	})
	if (!product)
		return NextResponse.json({ error: 'Invalid product.' }, { status: 404 })
		
	const body = await request.json()
	const validation = productSchema.safeParse(body)
	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 })

        const category = await prisma.category.findUnique({
            where: { id: body.categoryId }
        })
        if (!category)
            return NextResponse.json({ error: 'Invalid category.'}, { status: 400 })
		
	const updatedProduct = await prisma.product.update({
		where: { id: product.id },
		data: {
			name: body.name,
			price: body.price,
			categoryId: body.categoryId
		}
	})
	
	return NextResponse.json(updatedProduct)
}

export async function DELETE(request: NextRequest, { params }: Props) {
	const product = await prisma.product.findUnique({
		where: { id: params.id }
	})
	if (!product)
		return NextResponse.json({ error: 'Invalid product.' }, { status: 404 })
		
	await prisma.product.delete({
		where: {id: product.id}
	})
	
	return NextResponse.json({})
}