import { EmptyTable, SortableTableColumn } from '@/app/components'
import { ProductItem } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import ProductItemStatusBadge from './ProductItemStatusBadge'

export type ProductItemSortingField = 'createdAt' | 'updatedAt'

interface Props {
	productItems: ProductItem[]
    sortedBy: ProductItemSortingField
    startNumber?: number
}

export default async function ProductItemTable({ productItems, sortedBy='updatedAt', startNumber=1 }: Props ) {
    if (productItems.length === 0)
        return <EmptyTable />

    return (
        <>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            <SortableTableColumn 
                                currentlySortedBy={sortedBy}
                                label={'Created At'}
                                sortField={'createdAt'}
                            />
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            <SortableTableColumn 
                                currentlySortedBy={sortedBy}
                                label={'Updated At'}
                                sortField={'updatedAt'}
                            />
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {productItems.map((item, index) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{ index + startNumber + 1 }</Table.Cell>
                            <Table.Cell>{ item.id }</Table.Cell>
                            <Table.Cell>
                                <ProductItemStatusBadge status={item.status} />
                            </Table.Cell>
                            <Table.Cell>{ item.createdAt.toLocaleString() }</Table.Cell>
                            <Table.Cell>{ item.updatedAt.toLocaleString() }</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}