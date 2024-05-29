'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Popover, ScrollArea, Table, Text, TextField } from '@radix-ui/themes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

interface Props {
    data: string[]
    placeholder: string
}

export default function PopoverFilter({ data, placeholder }: Props) {
    const router = useRouter()
    const currentPath = usePathname()
    const searchParams = useSearchParams()
    const [ selectedItem, setSelectedItem ] = useState('')
    const [ search, setSearch ] = useState('')

    const handleSelectItem = (item: string) => {
        const urlSearchParams = new URLSearchParams(searchParams)
        urlSearchParams.set('filter', item)
        router.push(`${currentPath}?${urlSearchParams.toString()}`)
        setSelectedItem(item)
    }

    const handleSearchItem = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
        setSearch(input.value.toLowerCase())
    }

    const handleClosePopover = () => {
        setSearch('')
    }

    const handleClear = () => {
        setSelectedItem('')
        router.push(currentPath)
    }

    const filteredData = data.filter(item => item.toLowerCase().includes(search))

    return (
        <Popover.Root>
            <Popover.Trigger >
                <Button variant='outline' onClick={() => setSearch('')}>
                    {selectedItem || placeholder} <ChevronDownIcon />
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <TextField.Root onChange={handleSearchItem} />
                {filteredData.length > 0 && 
                    <>
                        <ScrollArea
                            className='pr-8' 
                            mt='4' 
                            scrollbars='vertical' 
                            style={{ height: 180 }} 
                            type='always' 
                        >
                            <Table.Root>
                                <Table.Body>
                                    {filteredData.map(item => (
                                        <Table.Row key={item}>
                                            <Popover.Close onClick={handleClosePopover}>
                                                <Table.Cell 
                                                    className='hover:text-[var(--accent-9)] hover:cursor-pointer'
                                                    onClick={() => handleSelectItem(item)}
                                                >
                                                    {item}
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