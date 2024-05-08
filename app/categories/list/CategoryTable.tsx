import paths from '@/app/paths'
import { Category } from '@prisma/client'
import { Flex, Link as RadixLink, Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { HiFolder } from 'react-icons/hi2'
import SortableTableColumn from './SortableTableColumn'

interface Props {
    categories: Category[],
    currentPage: number,
    pageSize: number,
    sortedBy: string
}

export default function CategoryTable({ categories, currentPage, pageSize, sortedBy }: Props) {
    if (categories.length === 0)
        return (
            <Table.Root variant='surface'>
                <Flex 
                    direction='column' 
                    justify='center' 
                    align='center' 
                    height='500px'
                    className='text-slate-200'
                    gap='3'
                >
                    <HiFolder size={70} />
                    <Text size='4' weight='light'>No results found</Text>
                </Flex>
            </Table.Root>
        )

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        <SortableTableColumn 
                            label='Name'
                            sortField='name'
                            currentlySortedBy={sortedBy}
                        />
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>
                        <SortableTableColumn 
                            label='Created At'
                            sortField='createdAt'
                            currentlySortedBy={sortedBy}
                        />
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>
                        <SortableTableColumn 
                                label='Updated At'
                                sortField='updatedAt'
                                currentlySortedBy={sortedBy}
                            />
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {categories.map((category, index) => (
                    <Table.Row key={category.id}>
                        <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>
                        <Table.RowHeaderCell>
                            <Link href={paths.categoryDetails(category.id)} legacyBehavior passHref>
                                <RadixLink>{category.name}</RadixLink>
                            </Link>
                        </Table.RowHeaderCell>
                        <Table.Cell className='hidden md:table-cell'>{category.createdAt.toDateString()}</Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{category.updatedAt.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}