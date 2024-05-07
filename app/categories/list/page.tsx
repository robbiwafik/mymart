import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { Box, Button, Flex, Link as RadixLink, Table } from '@radix-ui/themes'
import Link from 'next/link'
import Pagination from './Pagination'
import SearchBox from './SearchBox'

interface Props {
    searchParams: { page: string, search: string }
}

export default async function CategoriesPage({ searchParams }: Props) {
    // Pagination
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
            <Flex mb='4' gap='4' justify='between' align='center'>
                <SearchBox />
                <Button>
                    <Link href='/categories/new'>New category</Link>
                </Button>
            </Flex>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created at</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Updated at</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {categories.map((category, index) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>
                            <Table.RowHeaderCell>
                                <Link href={`/categories/${category.id}`} legacyBehavior passHref>
                                    <RadixLink>{category.name}</RadixLink>
                                </Link>
                            </Table.RowHeaderCell>
                            <Table.Cell className='hidden md:table-cell'>{category.createdAt.toDateString()}</Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{category.updatedAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination 
                categoryCount={categoryCount}
                currentPage={currentPage} 
                pageSize={pageSize}
            />
        </Box>
    )
}

export const dynamic = 'force-dynamic'