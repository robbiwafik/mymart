'use client'

import { FieldLabel } from '@/app/components'
import { Button, Flex, Text } from '@radix-ui/themes'
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import AddMultipleInputsButton from './AddMultipleInputsButton'
import ProductItemIdInputs, { IdInput } from './ProductItemIdInputs'

interface Props {
    errors?: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ id: number; value: string; }>> | undefined)[]>
    onChange: (values: IdInput[]) => void
}

export default function ProductItemIdsField({ errors=[], onChange }: Props) {
    const [ inputs, setInputs ] = useState([
        {id: 1, value: ''}
    ])

    useEffect(() => {
        onChange(inputs)
    }, [])

    const handleInputIdsChange = (newInputs: IdInput[]) => {
        setInputs(newInputs)
        onChange(newInputs)
    }

    const handleAddInput = (id: number) => {
        const copiedInputs = [...inputs]
        copiedInputs.push({ id, value: '' })

        setInputs(copiedInputs)
        onChange(copiedInputs)
    }

    const handleAddMultipleInputs = (inputCount: number, isAutoGenerateIds: boolean) => {
        const rangeStart = inputs.length + 1
        const rangeEnd = inputs.length + inputCount + 1
        const ids = _.range(rangeStart, rangeEnd)
        const copiedInputs = [...inputs]
        ids.map(id => copiedInputs.push({ id, value: isAutoGenerateIds ? nanoid() : ''}))

        setInputs(copiedInputs)
        onChange(copiedInputs)
    }

    return (
        <Flex direction='column' gap='2'>
            <FieldLabel value='Id(s)' />
            <Flex gap='4' maxWidth='800px'>
                <ProductItemIdInputs 
                    errors={errors}
                    inputs={inputs}
                    onInputsChange={handleInputIdsChange}
                />
                <Flex direction='column' gap='2'>
                    <Button 
                        onClick={() => handleAddInput(inputs.length + 1)}
                        type='button' 
                        variant='outline' 
                    >
                        {'+ 1'}
                    </Button>
                    <AddMultipleInputsButton onAddMultipleInputs={handleAddMultipleInputs}/>
                </Flex>
            </Flex>
            <Text
                color={errors.length ? 'red' : 'gray'}
                size='2' 
            >
                Total: {inputs.length} inputs
            </Text>
        </Flex>
    )
}