import { Flex, Text, TextField } from '@radix-ui/themes'

interface Props {
    disabled?: boolean
    defaultValue?: string
    error?: string
    label: string
    maxWidth?: string
    register?: any
    type?: string
}

export default function Field({
    defaultValue, 
    disabled, 
    error, 
    label, 
    maxWidth, 
    register,
    type
}: Props) {
    return (
        <Flex
            direction='column' 
            gap='2' 
            maxWidth={maxWidth || '100%'} 
            mb='4'
        >
            <Text
                size='2' 
                color='gray' 
                as='label'
            >
                {label}
            </Text>
            <TextField.Root 
                defaultValue={defaultValue} 
                disabled={disabled}
                color={error ? 'red' : undefined}
                type={type}
                {...register}
            />
            {error && <Text size='2' color='red'>{error}</Text>}
        </Flex>
    )
}