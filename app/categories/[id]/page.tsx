import { PageTitle } from '@/app/components'
import prisma from '@/prisma/client'
import { Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import CategoryForm from '../_components/CategoryForm'

interface Props {
    params: { id: string }
}

export default async function CategoryDetailsPage({ params }: Props) {
    const category = await prisma.category.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!category)
        notFound()

    return (
        <Flex direction='column' gap='5'>
            <PageTitle value={'Category Details'} />
            <CategoryForm category={category} />
        </Flex>
    )
}