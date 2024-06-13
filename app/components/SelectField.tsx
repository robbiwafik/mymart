'use client'

import {
    Box, Button, ChevronDownIcon,
    Flex, Popover, ScrollArea,
    Skeleton, Table, Text,
    TextField
} from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import FieldLabel from './FieldLabel'

interface Props {
    defaultValue?: any
    error?: string
    label: string
    loading?: boolean
    onChange: (value: string) => void
    options: {
        value: any,
        label: string
    }[]
    placeholder?: string
    searchLabel?: boolean
}

export default function SelectionField({
    defaultValue, 
    error, 
    label, 
    loading=false, 
    onChange,
    options,
    placeholder,
    searchLabel=true
}: Props) {
    const [ selected, setSelected ] = useState(defaultValue || '')
    const [ searchQuery, setSearchQuery ] = useState('')

    useEffect(() => {
        onChange(selected)
    }, [])

    const handleSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    const handleSelect = (value: any) => {
        if (onChange)
            onChange(value)

        setSelected(value)
    }

    const filteredOptions = options.filter(item => (
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    ))
    
    return (
        <Flex direction='column' gap='2' align='start'>
            <FieldLabel value={label} />
            <Popover.Root>
                    <Skeleton loading={loading}>
                        <Popover.Trigger>
                            <Button onClick={() => setSearchQuery('')} variant='outline' color='gray'>
                                <Text className='text-slate-900' weight='regular'>
                                    {options.find(item => item.value === selected)?.label || placeholder}
                                </Text>
                                <ChevronDownIcon />
                            </Button>
                        </Popover.Trigger>
                    </Skeleton>
                    <Popover.Content>
                        <Flex direction='column' gap='3'>
                            {searchLabel && <TextField.Root onChange={(event) => handleSearch(event.target.value)} />}
                            {filteredOptions.length > 0 &&
                             <ScrollArea 
                                type='hover' 
                                scrollbars='vertical' 
                                style={{ maxHeight: 180 }}
                             >
                                <Box pr='4'>
                                    <Table.Root>
                                        <Table.Body>
                                            {filteredOptions.map(option => (
                                                <Popover.Close key={option.value}>
                                                    <Table.Row className='hover:cursor-pointer hover:text-[var(--accent-9)]'>
                                                        <Table.Cell onClick={() => handleSelect(option.value)}>
                                                            {option.label}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Popover.Close>
                                            ))}
                                        </Table.Body>
                                    </Table.Root>
                                </Box>
                            </ScrollArea>}
                            {filteredOptions.length === 0 && 
                             <Text size='2' color='gray' align='center'>No results found.</Text>
                            }
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
                {error && <Text color='red' size='2'>{error}</Text>}
        </Flex>
    )
}