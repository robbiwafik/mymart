import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Box, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import CategoryTable from './CategoryTable'
import Pagination from './Pagination'
import SearchBox from './SearchBox'
import paths from '@/app/paths'

interface Props {
    searchParams: { page: string, search: string }
}

export default async function CategoriesPage({ searchParams }: Props) {
    const pageSize = 10   
    const currentPage = parseInt(searchParams.page) || 1

    const whereOption: Prisma.CategoryWhereInput = {
        name: {
            contains: searchParams.search
        }
    }
    const categories = await prisma.category.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where: whereOption
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