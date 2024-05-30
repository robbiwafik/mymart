'use client'

import { DeleteButton, Field, FormCard } from '@/app/components'
import paths from '@/app/paths'
import { productSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import CategorySelectField from '../new/CategorySelectField'

interface Props {
    product?: Product
}

type Inputs = z.infer<typeof productSchema>

export default function ProductForm({ product }: Props) {
    const router = useRouter()
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isDeleting, setIsDeleting ] = useState(false)

    const { 
        control, 
        formState: { errors },
        handleSubmit, 
        register 
    } = useForm<Inputs>({
        resolver: zodResolver(productSchema)
    })

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/products/${product?.id}`)
            router.push(paths.PRODUCT_LIST)
            router.refresh()
        }
        catch {
            toast.error('An unexpected error ocurred.')
            setIsDeleting(false)
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsSubmitting(true)
            if (product)
                await axios.patch(`/api/products/${product.id}`, data)
            else
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
                    {product && 
                     <Field 
                        defaultValue={product.id}
                        disabled
                        label='Id'
                        maxWidth='500px'
                     />
                    }
                    <Field 
                        label='Name' 
                        maxWidth='500px'
                        register={register('name')}
                        error={errors.name?.message}
                        defaultValue={product?.name}
                    />
                    <Field 
                        label='Price' 
                        maxWidth='200px' 
                        type='number' 
                        step='any'
                        register={register('price', { valueAsNumber: true })}
                        error={errors.price?.message}
                        defaultValue={product?.price}
                    />
                    <Controller
                        control={control}
                        defaultValue={product?.categoryId}
                        name='categoryId'
                        render={({ field }) => (
                            <CategorySelectField 
                                defaultValue={product?.categoryId}
                                error={errors.categoryId?.message} 
                                onChange={(value) => field.onChange(value)}
                            />
                            )
                        }
                    />
                    {product &&
                    <Field
                        defaultValue={product.createdAt.toLocaleString()} 
                        disabled 
                        label='Created at' 
                    />}    
                    {product &&
                    <Field
                        defaultValue={product.updatedAt.toLocaleString()} 
                        disabled 
                        label='Last updated at' 
                    />}
                    <Flex mt='5' justify={product ? 'between' : 'end'}>
                        {product && 
                        <DeleteButton 
                            alertDescription='Are you sure to delete this product? This action cannot be undone.'
                            alertTitle='Delete product'
                            isDeleting={isDeleting}
                            onDelete={handleDelete}
                            title='Delete'
                        />}
                        <Flex gap='4'>
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
                    </Flex>
                </form>
            </FormCard>
            <ToastContainer />
        </>
    )
}