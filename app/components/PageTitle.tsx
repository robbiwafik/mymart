import { Text } from '@radix-ui/themes'

interface Props {
    value: string
}

export default function PageTitle({ value }: Props) {
    return (
        <Text as='p' size='6' weight='medium'>
            {value}
        </Text>
    )
}