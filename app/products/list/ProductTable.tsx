import EmptyTable from '@/app/components/EmptyTable'
import Pagination from '@/app/components/Pagination'
import { Category, Product as ProductModel } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import _ from 'lodash'

interface Product extends ProductModel {
    category: Category
}

interface Props {
    products: Product[],
    currentPage: number,
    pageSize: number
}

export default async function ProductTable({ products, currentPage, pageSize }: Props) {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedProducts = _.slice(products, start, end)

    if (paginatedProducts.length === 0)
        return <EmptyTable />
        
    return (
        <>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginatedProducts.map((product, index) => (
                        <Table.Row key={product.id}>
                            <Table.Cell>{(currentPage - 1) * pageSize + index + 1}</Table.Cell>
                            <Table.RowHeaderCell>{product.name}</Table.RowHeaderCell>
                            <Table.Cell>$ {product.price}</Table.Cell>
                            <Table.Cell>{product.category.name}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination 
                currentPage={currentPage}
                itemCount={products.length}
                pageSize={pageSize}
            />
        </>
    )
}