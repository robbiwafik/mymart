'use client'

import Field from '@/app/components/Field'
import useUserContext from '@/app/hooks'
import { editUserSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Flex, Spinner } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { notFound, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import UserImageInput from './UserImageInput'

interface Props {
    id: string
}

type Inputs = z.infer<typeof editUserSchema>

export default function EditUserPage({ id }: Props) {
    const { setUser: setUserContext } = useUserContext()
    const { data, error, isFetched, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get('/api/users/' + id).then(res => res.data)
    }) 

    const router = useRouter()
    const [ user, setUser ] = useState(data)
    const [ previewImage, setPreviewImage ] = useState('')
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors } 
    } = useForm<Inputs>({
        resolver: zodResolver(editUserSchema)
    })

    useEffect(() => {
        if (data) {
            setUser(data)
            setValue('name', data.name)
            setPreviewImage(data.image)
        }

        setValue('image', null)
    }, [isFetched, data, setValue])

    const handleChangeImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            const file = target.files[0]
            const urlImage = URL.createObjectURL(file)
            setPreviewImage(urlImage)
            setValue('image', file)
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            setIsSubmitting(true)
            const formData = new FormData()

            if (values.image)
                formData.append('image', values.image)
            formData.append('name', values.name)

            const { data: updatedUser } = await axios.patch('/api/users/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setUser(updatedUser)
            setPreviewImage(updatedUser.image)
            setUserContext(updatedUser)
            toast.success('Updated successfully')
        }
        catch {
            setPreviewImage(user.image)
            toast.error('Unexpected error ocurred.')
        }

        setIsSubmitting(false)
    }

    const disableSubmit = () => {
        if (user)
            return watch('name') === user.name && previewImage === user.image

        return true
    }

    if (error)
        notFound()
    
    return (
        <>
            <Box className='w-full'>
                <Card className='!px-8 !py-5'>
                    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                        <UserImageInput 
                            register={register('image', {
                                onChange: handleChangeImage
                            })} 
                            src={previewImage}
                            loading={isLoading}
                        />
                        <Field 
                            label='ID' 
                            maxWidth='300px'
                            disabled
                            defaultValue={user?.id}
                            loading={isLoading}
                        />
                        <Field 
                            label='Username' 
                            maxWidth='500px' 
                            disabled
                            defaultValue={user?.username}
                            loading={isLoading}
                        />
                        <Field 
                            label='Name' 
                            maxWidth='500px'
                            defaultValue={user?.name}
                            register={register('name')}
                            error={errors?.name?.message}
                            loading={isLoading}
                        />
                        <Flex gap='4' justify='end'>
                            <Button variant='soft' color='gray' onClick={() => router.back()}>
                                Go Back
                            </Button>
                            <Button disabled={disableSubmit() || isSubmitting}>
                                Submit
                                {isSubmitting && <Spinner />}
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </Box>
            <ToastContainer />
        </>
    )
}