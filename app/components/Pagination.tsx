'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
    itemCount: number
    currentPage: number
    pageSize: number
}

export default function Pagination({ itemCount, currentPage, pageSize }: Props ) {
    const router = useRouter()
    const currentPath = usePathname()
    const searchParams = useSearchParams()
    const pageCount = Math.ceil(itemCount / pageSize)

    if (pageCount > 0 && currentPage > pageCount)
        notFound()

    const handleMovePage = (page: number) => {
        const urlSearchParams = new URLSearchParams(searchParams)
        urlSearchParams.set('page', page.toString())
        router.push(`${currentPath}?${urlSearchParams.toString()}`)
    }

    if (pageCount <= 1)
        return null

    return (
        <Flex mt='4' align='center' gap='4' justify='end'>
            <Text size='2'>{currentPage} of {pageCount} pages</Text>
            <Flex gap='2'>
                <Button variant='outline' color='gray' onClick={() => handleMovePage(1)} disabled={currentPage === 1}>
                    <DoubleArrowLeftIcon  />
                </Button>
                <Button variant='outline' color='gray' onClick={() => handleMovePage(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeftIcon  />
                </Button>
                <Button variant='outline' color='gray' onClick={() => handleMovePage(currentPage + 1)} disabled={currentPage === pageCount}>
                    <ChevronRightIcon  />
                </Button>
                <Button variant='outline' color='gray' onClick={() => handleMovePage(pageCount)} disabled={currentPage === pageCount}>
                    <DoubleArrowRightIcon  />
                </Button>
            </Flex>
        </Flex>
    )
}