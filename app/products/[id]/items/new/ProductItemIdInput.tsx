import { Cross2Icon, SymbolIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text, TextField } from '@radix-ui/themes'
import { ChangeEvent } from 'react'

interface Props {
    error?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onDeleteInput: () => void
    onGenerateId: () => void
    value: string
}

export default function ProductItemIdInput({ 
    error, 
    onChange, 
    onDeleteInput, 
    onGenerateId, 
    value
}: Props) {
    return (
        <Flex direction='column' gap='2'>
            <TextField.Root
                color={error ? 'red' : undefined}
                onChange={onChange}
                size='2'
                value={value}
            >
                <TextField.Slot>
                    <IconButton 
                        onClick={onGenerateId}
                        size='1' 
                        type='button' 
                        variant='ghost'
                    >
                        <SymbolIcon />
                    </IconButton>
                </TextField.Slot>
                <TextField.Slot>
                    <IconButton
                        color='red' 
                        onClick={onDeleteInput}
                        size='1' 
                        type='button' 
                        variant='ghost' 
                    >
                        <Cross2Icon className='text-red-400' />
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
            {error && (
                <Text size='2' color='red'>{error}</Text>
            )}
        </Flex>
    )
}