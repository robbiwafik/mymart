import { Box, Flex, Skeleton, Table } from '@radix-ui/themes'
import _ from 'lodash'

export default function LoadingCategoriesPage() {
    const data = _.range(1, 11)

    return (
        <Box>
            <Flex gap='1' mb='4'>
                <Skeleton height='20px' width='70%' />
                <Skeleton height='20px' width='15%' />
                <Skeleton height='20px' width='15%' className='ml-2' />
            </Flex>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell><Skeleton /></Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            <Skeleton />
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            <Skeleton />
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            <Skeleton />
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((number) => (
                        <Table.Row key={number}>
                            <Table.Cell><Skeleton /></Table.Cell>
                            <Table.RowHeaderCell>
                                <Skeleton />
                            </Table.RowHeaderCell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Flex justify='end' mt='4'>
                <Skeleton height='20px' width='250px' />
            </Flex>
        </Box>
    )
}