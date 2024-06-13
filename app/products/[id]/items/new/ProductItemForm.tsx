'use client'

import { FormCard, GoBackButton } from '@/app/components'
import paths from '@/app/paths'
import { productItemSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { Button, Flex } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import ProductItemIdsField from './ProductItemIdsField'
import ProductItemStatusField from './ProductItemStatusField'

interface Props {
    product: Product
}

type Inputs = z.infer<typeof productItemSchema>

export default function ProductItemForm({ product }: Props) {
    const { control, formState: { errors }, handleSubmit } = useForm<Inputs>({
        resolver: zodResolver(productItemSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <FormCard maxWidth='850px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction='column' gap='4'>
                    <Controller 
                        control={control}
                        name='ids'
                        render={({ field }) => (
                            <ProductItemIdsField
                                errors={errors['ids']} 
                                onChange={( values ) => field.onChange(values)} 
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <ProductItemStatusField 
                                error={errors['status']?.message} 
                                onChange={(status) => field.onChange(status)} 
                            />
                        )}
                    />
                </Flex>
                <Flex justify='between' mt='8'>
                    <GoBackButton href={paths.productItemListPage(product.id)} />
                    <Button>Submit</Button>
                </Flex>
            </form> 
        </FormCard>
    )
}