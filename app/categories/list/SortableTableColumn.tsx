'use client'

import paths from '@/app/paths'
import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Props {
    label: string,
    sortField: string,
    currentlySortedBy: string
}

export default function SortableTableColumn({ label, sortField, currentlySortedBy }: Props) {
    const searchParams = useSearchParams()    
    const urlSearchParams = new URLSearchParams(searchParams)
    urlSearchParams.set('sort', sortField)

    return (
        <Flex gap='2' align='center'>
            <Link href={paths.CATEGORY_LIST + '?' + urlSearchParams.toString()}>
                {label}
            </Link>
            {currentlySortedBy === sortField && <TriangleUpIcon />}
        </Flex>
    )
}