'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface Props {
    placeholder: string
}

export default function SearchBox({ placeholder }: Props) {
    const router = useRouter()
    const currentPath = usePathname()
    const searchParams = useSearchParams()
    const [ searchQuery, setSearchQuery ] = useState('')

    const handleSearch = () => {
        const urlSearchParams = new URLSearchParams(searchParams)
        urlSearchParams.set('search', searchQuery)
        const queryParams = searchQuery ? '?' + urlSearchParams.toString() : ''
        router.push(currentPath + queryParams)
    }

    const handleClear = () => {
        setSearchQuery('')
        const urlSearchParams = new URLSearchParams(searchParams)
        urlSearchParams.delete('search')
        const queryParams = searchQuery ? '?' + urlSearchParams.toString() : ''
        router.push(currentPath + queryParams)
    }

    return (
        <Flex gap='1' width='100%'>
            <Box width='100%'>
                <TextField.Root 
                    placeholder={placeholder} 
                    onChange={({ target: input }) => setSearchQuery(input.value)}
                    value={searchQuery}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height='16' width='16' />
                    </TextField.Slot>
                </TextField.Root>
            </Box>
            <Button variant='surface' onClick={handleSearch}>Search</Button>
            {searchQuery && <Button variant='soft' color='gray' onClick={handleClear}>Clear</Button>}
        </Flex>
    )
}