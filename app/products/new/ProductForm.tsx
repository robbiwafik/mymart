'use client'

import { Field, FormCard } from '@/app/components'
import { productSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import CategorySelectField from './CategorySelectField'
import { useState } from 'react'
import paths from '@/app/paths'

type Inputs = z.infer<typeof productSchema>

export default function ProductForm() {
    const router = useRouter()
    const { control, register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(productSchema)
    })
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/products', data)
            router.push('/products/list')
            router.refresh()
        } catch {
            toast.error('An unexpected error ocurred.')
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <FormCard maxWidth='800px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field 
                        label='Name' 
                        maxWidth='500px'
                        register={register('name')}
                        error={errors.name?.message}
                    />
                    <Field 
                        label='Price' 
                        maxWidth='200px' 
                        type='number' 
                        step='any'
                        register={register('price', { valueAsNumber: true })}
                        error={errors.price?.message}
                    />
                    <Controller 
                        name='categoryId'
                        control={control}
                        render={({ field }) => (<CategorySelectField error={errors.categoryId?.message} onChange={(value) => field.onChange(value)} />)}
                    />
                    <Flex mt='5' justify='end' gap='4'>
                        <Button 
                            type='button'
                            color='gray'
                            onClick={() => router.push(paths.PRODUCT_LIST)} 
                            variant='surface' 
                        >
                            Go Back
                        </Button>
                        <Button disabled={isSubmitting}>
                            Submit
                            {isSubmitting && <Spinner />}
                        </Button>
                    </Flex>
                </form>
            </FormCard>
            <ToastContainer />
        </>
    )
}