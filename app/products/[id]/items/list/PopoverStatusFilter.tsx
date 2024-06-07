import { PopoverFilter } from '@/app/components'
import { ProductItemStatus } from '@prisma/client'

interface StatusFilterItem {
    value: ProductItemStatus
    label: string
}

export default function PopoverStatusFilter() {
    const data: StatusFilterItem[] = [
        {value: 'AVAILABLE', label: 'Available'},
        {value: 'ON_STOCK', label: 'On stock'},
        {value: 'SOLD', label: 'Sold'}
    ]

    return (
        <PopoverFilter 
            data={data} 
            searchItem={false}
            parameterName='status'
            placeholder='Filter by status' 
        />
    )
}