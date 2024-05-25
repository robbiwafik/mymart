import { Flex, Table, Text } from '@radix-ui/themes'
import { HiFolder } from 'react-icons/hi2'

export default function EmptyTable() {
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
}