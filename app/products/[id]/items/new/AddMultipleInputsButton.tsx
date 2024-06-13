'use client'

import { 
    Button, Checkbox, Flex, 
    Popover, Text, TextField 
} from '@radix-ui/themes'
import { ChangeEvent, useState } from 'react'

interface Props {
    onAddMultipleInputs: (inputCount: number, isAutoGenerateIds: boolean) => void
}

export default function AddMultipleInputsButton({onAddMultipleInputs}: Props) {
    const [ inputCount, setInputCount ] = useState(0)
    const [ isAutoGenerateIds, setIsAutoGenerateIds ] = useState(false)

    const handleTriggerPopover = () => {
        setInputCount(0)
        setIsAutoGenerateIds(false)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        setInputCount(value)
    }
    
    const handleCheckboxClick = () => {
        setIsAutoGenerateIds(!isAutoGenerateIds)
    }

    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button 
                    onClick={handleTriggerPopover}
                    type='button' 
                    variant='outline'
                >
                    {'+ > 1'}
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <Flex direction='column' gap='4'>
                    <TextField.Root
                        onChange={(event) => handleInputChange(event)}
                        placeholder='Number of input(s)' 
                        type='number' 
                    />
                    <Text as='label' size='2'>
                        <Flex gap='2'>
                            <Checkbox onClick={handleCheckboxClick} />
                            Auto generate Id(s)
                        </Flex>
                    </Text>
                    <Flex justify='between'>
                        <Popover.Close>
                            <Button 
                                color='gray' 
                                type='button' 
                                variant='outline'
                            >
                                Cancel
                            </Button>
                        </Popover.Close>
                        <Popover.Close>
                            <Button 
                                onClick={() => onAddMultipleInputs(inputCount, isAutoGenerateIds)} 
                                type='button'
                            >
                                Add
                            </Button>
                        </Popover.Close>
                    </Flex>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    )
}