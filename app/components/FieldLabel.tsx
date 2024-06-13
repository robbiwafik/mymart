import { Text } from "@radix-ui/themes"

interface Props {
    value: string
}

export default function FieldLabel({ value }: Props) {
    return (
        <Text
            color='gray'
            size='2'
            as='label'
        >
            {value}
        </Text>
    )
}