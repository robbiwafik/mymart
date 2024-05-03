import { Button, Text } from '@radix-ui/themes'
import Link from 'next/link'

export default function CategoriesPage() {
    return (
        <Button>
            <Text>
                <Link href={'/categories/new'}>Add category</Link>
            </Text>
        </Button>
    )
}