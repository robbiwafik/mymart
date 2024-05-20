'use client'

import Field from '@/app/components/Field'
import { changePasswordSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog, Box, Button, Callout, Card, Flex, Spinner, Text } from '@radix-ui/themes'
import axios, { Axios, AxiosError } from 'axios'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiInformationCircle } from 'react-icons/hi2'
import { z } from 'zod'

interface Props {
    id: string
}

type Inputs = z.infer<typeof changePasswordSchema>

export default function ChangePasswordForm({ id }: Props) {
    const [ onSubmitError, setOnSubmitError ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(changePasswordSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            setIsSubmitting(true)
            await axios.patch(`/api/users/changePassword/${id}`, values)
            signOut()
        } catch (error: any) {
            setIsSubmitting(false)
            if (error instanceof AxiosError)
                setOnSubmitError(error.response?.data.error)
            else
                setOnSubmitError('Unexpected error occurred.')
        }
    }

    return (
        <Box className='w-full'>
            <Card className='!px-8 !py-5'>
                <Text 
                    size='4' weight='medium' 
                    as='p' mb='3'
                >
                    Change password
                </Text>
                {onSubmitError && 
                <Callout.Root my='4' color='red'>
                    <Callout.Icon>
                        <HiInformationCircle />
                    </Callout.Icon>
                    <Callout.Text>{onSubmitError}</Callout.Text>
                </Callout.Root>}
                <form>
                    <Field 
                        label='Current password' type='password' 
                        register={register('currentPassword')} 
                        error={errors.currentPassword?.message}
                    />
                    <Field 
                        label='New Password' type='password' 
                        register={register('newPassword')} 
                        error={errors.newPassword?.message}
                    />
                    <Flex justify='end'>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button disabled={Object.keys(errors).length > 0}>
                                    Submit
                                </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Change Password</AlertDialog.Title>
                                <AlertDialog.Description>
                                    Are you sure to change your password? This 
                                    action requires re-signing in.
                                </AlertDialog.Description>
                                <Flex mt='4' justify='end' gap='3'>
                                    <AlertDialog.Cancel>
                                        <Button variant='surface'>Close</Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button 
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={
                                                Object.keys(errors).length > 0 ||
                                                isSubmitting
                                            }
                                        >
                                            Submit {isSubmitting && <Spinner />}
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </form>
            </Card>
        </Box>
    )
}