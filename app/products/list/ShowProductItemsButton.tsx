import paths from '@/app/paths'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    productId: string
}

export default function ShowProductItemsButton({ productId }: Props) {
    return (
        <Link href={paths.productItemListPage(productId)}>
            <Button variant='outline'>Show items</Button>
        </Link>
    )
}