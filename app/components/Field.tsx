import { Flex, Skeleton, Text, TextField } from '@radix-ui/themes'

interface Props {
    disabled?: boolean
    defaultValue?: any
    error?: string
    label: string
    loading?: boolean
    maxWidth?: string
    register?: any
    step?: any
    type?: string
}

export default function Field({
    defaultValue, 
    disabled, 
    error, 
    label, 
    loading = false,
    maxWidth, 
    register,
    step,
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
            <Skeleton loading={loading}>
                <TextField.Root 
                    defaultValue={defaultValue} 
                    disabled={disabled}
                    color={error ? 'red' : undefined}
                    type={type}
                    step={step}
                    {...register}
                />
            </Skeleton>
            {error && <Text size='2' color='red'>{error}</Text>}
        </Flex>
    )
}