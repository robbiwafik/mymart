import prisma from '@/prisma/client'
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
        <CategoryForm category={category} />
    )
}