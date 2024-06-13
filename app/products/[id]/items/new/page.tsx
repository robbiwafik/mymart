import { PageTitle } from '@/app/components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ProductItemForm from './ProductItemForm'

interface Props {
    params: { id: string }
}

export default async function NewProductPage({ params }: Props ) {
    const product = await prisma.product.findUnique({
        where: { id: params.id }
    })

    if (!product)
        notFound()

    return (
        <Flex direction='column' gap='4'>
            <PageTitle value={product.name} />
            <ProductItemForm product={product} />
        </Flex>
    )
}