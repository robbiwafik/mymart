import { PageTitle } from '@/app/components'
import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { Box, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductForm from '../_components/ProductForm'

interface Props {
    params: { id: string }
}

export default async function ProductDetailsPage({ params }: Props) {
    const product = await prisma.product.findUnique({
        where: { id: params. id }
    })

    if (!product)
        notFound()
    
    return (
        <Flex direction='column' gap='5'>
            <PageTitle value='Product Details' />
            <Flex gap='4'>
                <Box width='800px'>
                    <ProductForm product={product} />
                </Box>
                <Link href={paths.productItemListPage(product.id)}>
                    <Button variant='outline'>Show items</Button>
                </Link>
            </Flex>
        </Flex>
    )
}