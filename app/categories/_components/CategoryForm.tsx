'use client'

import { DeleteButton, Field, FormCard } from '@/app/components'
import paths from '@/app/paths'
import { categorySchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

interface Props {
    category?: Category
}

type Inputs = z.infer<typeof categorySchema>

export default function CategoryForm({ category }: Props) {
    const router = useRouter()
    const [ isSubmitting, setSubmitting ] = useState(false)
    const [ isDeleting, setIsDeleting ] = useState(false)

    const { 
        formState: { errors },
        handleSubmit,
        register, 
    } = useForm<Inputs>({
        resolver: zodResolver(categorySchema)
    }) 

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/categories/${category?.id}`)
            router.push(paths.CATEGORY_LIST)
            router.refresh()
        }
        catch {
            toast.error('Unexpected error ocurred.')
            setIsDeleting(false)
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setSubmitting(true)
            if (category)
                await axios.patch(`/api/categories/${category.id}`, data)
            else
                await axios.post('/api/categories', data)
            router.push(paths.CATEGORY_LIST)
            router.refresh()
        }
        catch {
            toast.error('An unexpected error ocurred.')
            setSubmitting(false)
        }
    }

    return (
        <>
            <FormCard maxWidth='800px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {category && 
                    <Field
                        defaultValue={category.id.toString()}
                        disabled
                        label='Id' 
                        maxWidth='250px' 
                    />}
                    <Field 
                        defaultValue={category?.name}
                        error={errors.name?.message} 
                        label='Name' 
                        maxWidth='500px' 
                        register={register('name')} 
                    />
                    {category && 
                    <Field
                        defaultValue={category.createdAt.toDateString()}
                        disabled
                        label='Created at' 
                        maxWidth='500px' 
                    />}
                    {category && 
                    <Field 
                        defaultValue={category.updatedAt.toDateString()}
                        disabled
                        label='Updated at' 
                        maxWidth='500px' 
                    />}
                    <Flex justify={category ? 'between' : 'end'}>
                        {category && 
                            <DeleteButton 
                                alertTitle='Delete category'
                                alertDescription='Are you sure you want to delete this item? This action cannot be undone.'
                                title='Delete'
                                isDeleting={isDeleting}
                                onDelete={handleDelete}
                            />
                        }
                        <Flex gap='4' justify='end'>
                            <Button variant='soft' color='gray'>
                                <Link href={paths.CATEGORY_LIST}>Go back</Link>
                            </Button>
                            <Button disabled={isSubmitting}>
                                <Spinner loading={isSubmitting} />
                                Submit
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            </FormCard>
            <ToastContainer />
        </>
    )
}