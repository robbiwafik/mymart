'use client'

import Field from '@/app/components/Field'
import { registerUserSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Flex, Spinner, Text } from '@radix-ui/themes'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

type Inputs = z.infer<typeof registerUserSchema>

export default function RegisterPage() {
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerUserSchema)
    }) 

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            setIsSubmitting(true)
            const user = await axios.post('/api/users', values)
            // sign in a user
            // redirect them to main page
            setIsSubmitting(false) //TODO: remove when redirecting users to the main page
        }
        catch {
            setIsSubmitting(false)
            toast.error('Unexpected error ocurred')
        }
    }
    
    return (
        <Flex height='100vh' justify='center' align='center'>
            <Card size='3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width='400px'>
                        <Text
                            as='p' 
                            align='center' 
                            size='6' 
                            mb='4'
                        >
                            Register Form
                        </Text>
                        <Field 
                            error={errors.name?.message} 
                            label='Name' 
                            register={register('name')} 
                        />
                        <Field 
                            error={errors.username?.message} 
                            label='Username' 
                            register={register('username')} 
                        />
                        <Field 
                            error={errors.password?.message} 
                            label='Password' 
                            register={register('password')} 
                            type='password' 
                        />
                        <Button disabled={isSubmitting} mt='5' className='!w-full'>
                            Submit
                            {isSubmitting && <Spinner />}
                        </Button>
                    </Box>
                </form>
            </Card>
            <ToastContainer />
        </Flex>
    )
}