import paths from '@/app/paths'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
    categoryId: number
}

export default function DeleteButton({ categoryId }: Props) {
    const router = useRouter()
    const [ isDeleting, setIsDeleting ] = useState(false)
    
    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/categories/${categoryId}`)
            router.push(paths.CATEGORY_LIST)
            router.refresh()
        }
        catch {
            toast.error('Unexpected error ocurred.')
            setIsDeleting(false)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth='450px'>
                    <AlertDialog.Title>Delete category</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this item? This action cannot be undone.</AlertDialog.Description>
                    <Flex mt='4' gap='4' justify='end'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={handleDelete} color='red'>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>   
            <ToastContainer />
        </>    
    )
}