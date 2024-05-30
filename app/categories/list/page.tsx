import { Pagination, SearchBox } from '@/app/components'
import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import CategoryTable from './CategoryTable'

interface Props {
    searchParams: { 
        page: string, 
        search: string,
        sort: string
    }
}

export default async function CategoriesPage({ searchParams }: Props) {
    const pageSize = 10   
    const currentPage = parseInt(searchParams.page) || 1

    const whereOption: Prisma.CategoryWhereInput = {
        name: {
            contains: searchParams.search
        }
    }

    const orderByOption: Prisma.CategoryOrderByWithRelationInput = searchParams.sort ? 
        { [searchParams.sort ]: 'asc'} : { createdAt: 'desc' }

    const categories = await prisma.category.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where: whereOption,
        orderBy: orderByOption
    })

    const categoryCount = await prisma.category.count({
        where: whereOption
    })
        
    return (
        <Flex direction='column' gap='4'>
            <Flex 
                align='center'
                gap='4' 
                justify='between' 
                mb='4' 
            >
                <SearchBox placeholder='Search category...' />
                <Button>
                    <Link href={paths.NEW_CATEGORY}>New category</Link>
                </Button>
            </Flex>
            <CategoryTable 
                categories={categories}
                currentPage={currentPage} 
                pageSize={pageSize} 
                sortedBy={searchParams.sort}
            />
            <Pagination 
                currentPage={currentPage} 
                itemCount={categoryCount}
                pageSize={pageSize}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'