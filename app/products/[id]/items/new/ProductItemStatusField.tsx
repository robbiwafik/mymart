import { SelectField } from '@/app/components'
import { ProductItemStatus } from '@prisma/client'
import { Flex, Text } from '@radix-ui/themes'

interface Props {
    error?: string
    onChange: (status: ProductItemStatus) => void
}

type ProductItemStatusOption = {
	value: ProductItemStatus,
	label: string
}

export default function ProductItemStatusField({ error, onChange }: Props) {
    const statusOptions: ProductItemStatusOption[] = [
        { value: 'AVAILABLE', label: 'Available' },
        { value: 'ON_STOCK', label: 'On stock' },
        { value: 'SOLD', label: 'Sold' }
    ]
    
    return (
        <Flex direction='column' gap='2'>
            <SelectField
                label='Status'
                onChange={(value) => onChange(value as ProductItemStatus)}
                options={statusOptions}
                defaultValue={ProductItemStatus.ON_STOCK}
                searchLabel={false}
            />
            {error && <Text color='red' size='2'>Test</Text>}
        </Flex>
    )
}