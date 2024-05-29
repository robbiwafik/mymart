'use client'

import { 
    Box, Button, ChevronDownIcon, 
    Flex, Popover, ScrollArea, 
    Skeleton, Table, Text, 
    TextField 
} from '@radix-ui/themes'
import { useState } from 'react'

interface Props {
    defaultValue?: string
    error?: string
    label: string
    loading?: boolean
    onChange?: (value: string) => void
    options: {
        value: any,
        label: string
    }[]
    placeholder?: string
}

export default function SelectionField({
    defaultValue, 
    error, 
    label, 
    loading=false, 
    onChange,
    options,
    placeholder
}: Props) {
    const [ selected, setSelected ] = useState(defaultValue || '')
    const [ searchQuery, setSearchQuery ] = useState('')

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
            <Text as='label' size='2' color='gray'>{label}</Text>
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
                            <TextField.Root onChange={(event) => handleSearch(event.target.value)} />
                            {filteredOptions.length > 0 &&
                             <ScrollArea type='always' scrollbars='vertical' style={{ maxHeight: 180 }}>
                                <Box pr='5'>
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