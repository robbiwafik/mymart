'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Popover, ScrollArea, Skeleton, Table, Text, TextField } from '@radix-ui/themes'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export interface Item {
	value: string
	label: string
}

interface Props {
    data: Item[]
    loading?: boolean
    parameterName?: string
    placeholder: string
    searchItem?: boolean
}

export default function PopoverFilter({ 
    data, 
    loading=false, 
    parameterName='filter',
    placeholder, 
    searchItem=true
}: Props) {
    const router = useRouter()
    const currentPath = usePathname()
    const [ selectedItem, setSelectedItem ] = useState({ value: '', label: ''})
    const [ search, setSearch ] = useState('')

    const urlSearchParams = new URLSearchParams()

    const handleSearchItem = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
        setSearch(input.value.toLowerCase())
    }

    const handleSelectItem = (item: Item) => {
        urlSearchParams.set(parameterName, item.value)
        router.push(`${currentPath}?${urlSearchParams.toString()}`)
        setSelectedItem(item)
    }

    const handleClosePopover = () => {
        setSearch('')
    }

    const handleClear = () => {
        setSelectedItem({ value: '', label: '' })
		urlSearchParams.delete(parameterName)
        router.push(`${currentPath}?${urlSearchParams.toString()}`)
        router.refresh()
    }

    const filteredData = data.filter(item => item.label.toLowerCase().includes(search))

    return (
        <Popover.Root>
            <Skeleton loading={loading}>
                <Popover.Trigger >
                    <Button variant='outline' onClick={() => setSearch('')}>
                        {selectedItem.label || placeholder} <ChevronDownIcon />
                    </Button>
                </Popover.Trigger>
            </Skeleton>
            <Popover.Content>
                {searchItem && <TextField.Root mb='4' onChange={handleSearchItem} />}
                {filteredData.length > 0 && 
                    <>
                        <ScrollArea
                            className='pr-2'
                            scrollbars='vertical' 
                            style={{ maxHeight: 180 }} 
                            type='hover' 
                        >
                            <Table.Root>
                                <Table.Body>
                                    {filteredData.map(item => (
                                        <Table.Row key={item.value}>
                                            <Popover.Close onClick={handleClosePopover}>
                                                <Table.Cell 
                                                    className='hover:text-[var(--accent-9)] hover:cursor-pointer'
                                                    onClick={() => handleSelectItem(item)}
                                                >
                                                    {item.label}
                                                </Table.Cell>
                                            </Popover.Close>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </ScrollArea>
                        <Popover.Close onClick={handleClosePopover}>
                            <Button
                                color='gray' 
                                mt='4' 
                                onClick={handleClear}
                                variant='surface'
                            >
                                Clear
                            </Button>
                        </Popover.Close>
                    </>
                }
                {filteredData.length === 0 &&
                    <Text
                        as='p' 
                        className='text-slate-400 text-center'
                        mt='4' 
                        size='2' 
                    >
                        Empty data.
                    </Text>
                }
            </Popover.Content>
        </Popover.Root>
    )
}