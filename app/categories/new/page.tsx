'use client'

import { categorySchema } from '@/app/api/categories/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Flex, Spinner, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'

type Inputs = z.infer<typeof categorySchema>

export default function NewCategoryPage() {
    const [ isSubmitting, setSubmitting ] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(categorySchema)
    })   

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/categories', data)
            router.push('/categories/list')
        }
        catch {
            toast.error('The form could not be submitted.')
            setSubmitting(false)
        }
    }
    
    return (
        <Box maxWidth='800px'>
            <Text
                as='p'
                mb='5'
                size='6'
                weight='medium'
            >
                Add New Category
            </Text>
            <Card className='!px-8 !py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex 
                        direction='column' 
                        gap='2' 
                        maxWidth='500px' 
                        mb='4'
                    >
                        <Text 
                            size='2' 
                            color='gray' 
                            as='label'
                        >
                            Name
                        </Text>
                        <TextField.Root color={errors.name && 'red'} {...register('name')} />
                        {errors.name && <Text size='2' color='red'>{errors.name.message}</Text>}
                    </Flex>
                    <Flex gap='4' justify='end'>
                        <Button variant='soft' color='gray'>
                            <Link href='/categories/list'>Go back</Link>
                        </Button>
                        <Button disabled={isSubmitting}>
                            <Spinner loading={isSubmitting} />
                            Submit
                        </Button>
                    </Flex>
                </form>
            </Card>
            <ToastContainer />
        </Box>
    )
}