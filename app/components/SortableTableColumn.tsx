'use client'

import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
    label: string,
    sortField: string,
    currentlySortedBy: string
}

export default function SortableTableColumn({ label, sortField, currentlySortedBy }: Props) {
    const searchParams = useSearchParams()    
    const currentPath = usePathname()
    const urlSearchParams = new URLSearchParams(searchParams)
    urlSearchParams.set('sort', sortField)

    return (
        <Flex gap='2' align='center'>
            <Link href={currentPath + '?' + urlSearchParams.toString()}>
                <Flex align='center' gap='3'>
                    {label}
                    {currentlySortedBy !== sortField && <TriangleUpIcon className='text-slate-300' />}
                    {currentlySortedBy === sortField && <TriangleUpIcon />}
                </Flex>
            </Link>
        </Flex>
    )
}