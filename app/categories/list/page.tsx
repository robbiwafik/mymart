import prisma from '@/prisma/client'
import { Box, Button, Flex, Link as RadixLink, Table } from '@radix-ui/themes'
import Link from 'next/link'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany()

    return (
        <Box>
            <Flex justify='end' mb='4'>
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
                            <Table.Cell>{index + 1}</Table.Cell>
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
        </Box>
    )
}