'use client'

import { categorySchema } from '@/app/api/categories/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { Box, Button, Card, Flex, Spinner, Text } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import DeleteButton from './DeleteButton'
import Field from '../../components/Field'
import paths from '@/app/paths'

interface Props {
    category?: Category
}

type Inputs = z.infer<typeof categorySchema>

export default function CategoryForm({ category }: Props) {
    const [ isSubmitting, setSubmitting ] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(categorySchema)
    }) 

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
        <Box maxWidth='800px'>
            <Text as='p'mb='5'size='6'weight='medium'>
                {category ? 'Category Details' : 'Add New Category'}
            </Text>
            <Card className='!px-8 !py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {category && <Field 
                        defaultValue={category.id.toString()}
                        label='Id' 
                        maxWidth='250px' 
                        disabled
                    />}
                    <Field 
                        error={errors.name?.message} 
                        label='Name' 
                        maxWidth='500px' 
                        register={register('name')} 
                        defaultValue={category?.name}
                    />
                    {category && <Field 
                        defaultValue={category.createdAt.toDateString()}
                        label='Created at' 
                        maxWidth='500px' 
                        disabled
                    />}
                    {category && <Field 
                        defaultValue={category.updatedAt.toDateString()}
                        label='Updated at' 
                        maxWidth='500px' 
                        disabled
                    />}
                    <Flex justify={category ? 'between' : 'end'}>
                        {category && <DeleteButton categoryId={category.id} />}
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
            </Card>
            <ToastContainer />
        </Box>
    )
}