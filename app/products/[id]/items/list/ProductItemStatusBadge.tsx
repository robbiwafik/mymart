import { ProductItemStatus } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

interface Props {
    status: ProductItemStatus
}

type ProductItemBadgeColor = 'orange' | 'blue' | 'green' | undefined

export default function ProductItemStatusBadge({ status }: Props) {
    let color: ProductItemBadgeColor
	let label
	
	if (status === 'ON_STOCK') {
		color = 'orange'
		label = 'On stock'
	}
	else if (status === 'AVAILABLE') {
		color = 'blue'
		label = 'Available'
	}
	else if (status === 'SOLD') {
		color = 'green'
		label = 'Sold'
	}
	
	return <Badge color={color} size='2'>{label}</Badge>
}