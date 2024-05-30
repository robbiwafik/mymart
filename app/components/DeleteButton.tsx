import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'

interface Props {
    alertDescription: string
    alertTitle: string
    isDeleting?: boolean
    onDelete: () => void
    title: string
}

export default function DeleteButton({
    alertDescription,
    alertTitle,
    isDeleting=false,
    onDelete,
    title
 }: Props) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' disabled={isDeleting}>
                    {title}
                    {isDeleting && <Spinner />}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth='450px'>
                <AlertDialog.Title>{alertTitle}</AlertDialog.Title>
                <AlertDialog.Description>{alertDescription}</AlertDialog.Description>
                <Flex mt='4' gap='4' justify='end'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button onClick={onDelete} color='red'>
                            {title}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}