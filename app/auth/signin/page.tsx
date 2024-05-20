'use client'

import Field from '@/app/components/Field'
import { signInSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Button, Callout, Card, Flex, Link as RadixLink, Spinner, Text } from '@radix-ui/themes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
    searchParams: { error: string }
}

type Inputs = z.infer<typeof signInSchema>

export default function SignInPage({ searchParams }: Props) {
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(signInSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        setIsSubmitting(true)
        signIn('credentials', {
            username: values.username,
            password: values.password,
            callbackUrl: '/'
        })
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
                            Sign In
                        </Text>
                        {searchParams.error === 'CredentialsSignin' &&
                        <Callout.Root my='4' color='red'>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>Invalid username or password</Callout.Text>
                        </Callout.Root>}
                        <Field 
                            label='Username'
                            register={register('username')}
                            error={errors.username?.message}
                        />
                        <Field 
                            label='Password' 
                            type='password'
                            register={register('password')}
                            error={errors.password?.message}
                        />
                        <Text size='2' mt='5' as='p'>
                            {`Don't have an account? register `}
                            <Link href='/users/register' passHref legacyBehavior> 
                                <RadixLink>here!</RadixLink>
                            </Link>
                        </Text>
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