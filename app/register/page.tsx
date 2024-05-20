'use client'

import Field from '@/app/components/Field'
import paths from '@/app/paths'
import { registerUserSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Callout, Card, Flex, Link as RadixLink, Spinner, Text } from '@radix-ui/themes'
import axios, { isAxiosError } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type Inputs = z.infer<typeof registerUserSchema>

export default function RegisterPage() {
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ isRegistered, setIsRegistered ] = useState(false)
    const [ onSubmitError, setOnSubmitError ] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerUserSchema)
    }) 

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/users', values)
            setIsRegistered(true)
            setOnSubmitError('')
            reset()
        }
        catch (error) {
            if (isAxiosError(error))
                setOnSubmitError(error.response?.data.error)
            else
                setOnSubmitError('Unexpected error ocurred.')
        }

        setIsSubmitting(false)
    }
    
    return (
        <Flex height='100vh' justify='center' align='center'>
            <Card size='3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box width='400px'>
                        <Text as='p' align='center' size='6' mb='4'>
                            Register Form
                        </Text>
                        {isRegistered && 
                        <Callout.Root my='4'>
                            <Callout.Icon>
                                <CheckIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                {`Your account was successfully created. Click `}
                                <Link href={paths.LOGIN_PAGE} passHref legacyBehavior>
                                    <RadixLink>here</RadixLink>
                                </Link>
                                {` to go back to the Sign in form!`}
                            </Callout.Text>
                        </Callout.Root>}
                        {onSubmitError &&
                        <Callout.Root my='4' color='red'>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>{onSubmitError}</Callout.Text>
                        </Callout.Root>}
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
        </Flex>
    )
}