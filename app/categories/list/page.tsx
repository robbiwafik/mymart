import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Box, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import CategoryTable from './CategoryTable'
import Pagination from './Pagination'
import SearchBox from './SearchBox'

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
        <Box>
            <Flex 
                mb='4' gap='4' 
                justify='between' align='center'
            >
                <SearchBox />
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
                categoryCount={categoryCount}
                currentPage={currentPage} 
                pageSize={pageSize}
            />
        </Box>
    )
}

export const dynamic = 'force-dynamic'