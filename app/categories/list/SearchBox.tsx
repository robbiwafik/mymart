'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBox() {
    const router = useRouter()
    const [ searchQuery, setSearchQuery ] = useState('')

    const handleSearch = () => {
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('search', searchQuery)
        const queryParams = searchQuery ? '?' + urlSearchParams.toString() : ''
        router.push('/categories/list' + queryParams)
    }

    const handleClear = () => {
        setSearchQuery('')
        router.push('/categories/list')
    }

    return (
        <Flex gap='1' width='100%'>
            <Box width='100%'>
                <TextField.Root 
                    placeholder='Search category...' 
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