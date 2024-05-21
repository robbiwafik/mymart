import { Flex, Text } from '@radix-ui/themes'
import ChangePasswordForm from './ChangePasswordForm'
import EditUserForm from './EditUserForm'

interface Props {
    params: { id: string }
}

export default function UserDetailsPage({ params }: Props) {
    return (
        <Flex direction='column'>
            <Text as='p'mb='5' size='6' weight='medium'>
                User Details Form
            </Text>
            <Flex justify='between' gap='2'>
                <EditUserForm id={params.id} />
                <ChangePasswordForm id={params.id} />
            </Flex>
        </Flex>
    )
}