import paths from '@/app/paths'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    productId: string
}

export default function NewProductItemButton({ productId }: Props ) {
    return (
        <Link href={paths.newProductItemPage(productId)}>
            <Button className='!w-24'>New item</Button>
        </Link>
    )
}