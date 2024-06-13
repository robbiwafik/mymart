import { Card, Flex, ScrollArea } from '@radix-ui/themes'
import { Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'
import ProductItemIdInput from './ProductItemIdInput'
import { ChangeEvent } from 'react'
import { nanoid } from 'nanoid'

export type IdInput = {
    id: number,
    value: string
}

interface Props {
    errors?: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ id: number, value: string }>> | undefined)[]>
	inputs: IdInput[]
	onInputsChange: (inputs: IdInput[]) => void
}

export default function ProductItemIdInputs({ errors=[], inputs, onInputsChange }: Props) {
    const handleInputChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
        const copiedInputs = [...inputs]
        
        const selectedInput = copiedInputs.find(input => input.id === id)
        if (!selectedInput) return
        selectedInput.value = event.target.value
        
        onInputsChange(copiedInputs)
    }

    const handleDeleteInput = (id: number) => {
        const filteredInputs = inputs.filter(input => input.id !== id)
        
        onInputsChange(filteredInputs)
    }

    const handleGenerateValue = (id: number) => {
        const copiedInputs = [...inputs]
        
        const selectedInput = copiedInputs.find(input => input.id === id)
        if (!selectedInput) return
        selectedInput.value = nanoid()
        
        onInputsChange(copiedInputs)
    }

    return (
        <Card className='flex-1'>
            <ScrollArea className='max-h-64'>
                <Flex
                    className='px-4 py-3' 
                    direction='column' 
                    gap='3'
                >
                    {inputs.map((input, index) => (
                        <ProductItemIdInput 
                            error={errors[index]?.value?.message}
                            key={input.id}
                            onChange={(event) => handleInputChange(input.id, event)}
                            onDeleteInput={() => handleDeleteInput(input.id)}
                            onGenerateId={() => handleGenerateValue(input.id)}
                            value={input.value}
                        />
                    ))}
                </Flex>
            </ScrollArea>
        </Card>
    )
}