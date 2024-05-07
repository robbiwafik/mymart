import paths from '@/app/paths'
import { Category } from '@prisma/client'
import { Link as RadixLink, Table } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    categories: Category[],
    currentPage: number,
    pageSize: number
}

export default function CategoryTable({ categories, currentPage, pageSize }: Props) {
    return (
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