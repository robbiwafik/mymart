import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    href: string
}

export default function GoBackButton({ href }: Props) {
    return (
        <Link href={href}>
            <Button color='gray' variant='outline'>
                <DoubleArrowLeftIcon />
                Go back
            </Button>
        </Link>
    )
}