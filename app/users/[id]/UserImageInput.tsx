'use client'

import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes'

interface Props {
    register?: any,
    src?: string,
    loading?: boolean
}

export default function UserImageInput({ register, src, loading = false }: Props) {

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Flex direction='column' gap='3' className='w-fit'>
                        <Text as='label' size='2' color='gray'>Photo profile</Text>
                        <Skeleton loading={loading}>
                            <Avatar
                                radius='full' size='7' mb='4' 
                                src={src}
                                fallback={<PersonIcon width='50px' height='50px' />}
                            />
                        </Skeleton>
                    </Flex>
                </DropdownMenu.Trigger>
                {!loading && 
                <DropdownMenu.Content>
                    <DropdownMenu.Item>
                        <label htmlFor='image'>Change</label>  
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item 
                        color='red'
                    >
                        Delete
                    </DropdownMenu.Item>
                </DropdownMenu.Content>}
            </DropdownMenu.Root>
            <input 
                title='image' type='file' 
                id='image' hidden 
                {...register}
            />    
        </>
    )
}