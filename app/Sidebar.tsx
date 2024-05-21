'use client'

import { DashboardIcon, HamburgerMenuIcon, PersonIcon, TableIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, DataList, Flex, HoverCard, Separator, Skeleton, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'
import paths from './paths'
import { useSession } from 'next-auth/react'

export default function Sidebar() {
    const [ expand, setExpand ] = useState(true)
    const currentPath = usePathname()

    const items: {
        label: string,
        Icon: ReactNode,
        href: string
    }[] = [
        { label: 'Dashboard', Icon: <DashboardIcon />, href: '/'},
        { label: 'Categories', Icon: <TableIcon />, href: paths.CATEGORY_LIST}
    ]

    const pathsToHideSidebar = [paths.LOGIN_PAGE, paths.REGISTER_PAGE]
    if (pathsToHideSidebar.includes(currentPath))
        return null

    return (
        <>
            <aside 
                className={classNames({
                    'w-52': expand,
                    'w-17': !expand,
                    'p-4 h-screen border-slate-100 border': true
                })}
            >
                <nav>
                    <Flex 
                        className={`
                            p-3 w-fit border border-black rounded-md
                            hover:border-[var(--accent-9)] hover:text-[var(--accent-9)]
                        `}
                        justify='center' 
                        mb='5' 
                        onClick={() => setExpand(!expand)}
                    >
                        <HamburgerMenuIcon />
                    </Flex>
                    <ul>
                        <li className='mb-6'>
                            <UserAvatarItem expand={expand} />
                        </li>
                        {items.map(item => (
                            <li 
                                className={classNames({
                                    'bg-[color:var(--accent-9)] text-slate-50': item.href === currentPath,
                                    'hover:cursor-pointer hover:text-slate-50 hover:bg-[color:var(--accent-9)]': true,
                                    'p-3 my-2 rounded-md duration-100': true,
                                })}
                                key={item.href}
                            >
                                <Link href={item.href}>
                                    <Flex align='center' gap='2'>
                                        {item.Icon}
                                        <Text 
                                            className={classNames({
                                                'hidden': !expand
                                            })}
                                            size='2'
                                        >
                                            {item.label}
                                        </Text>
                                    </Flex>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

function UserAvatarItem({ expand }: { expand: boolean }) {
    const { status, data: session } = useSession()

    if (session)
        console.log('session', session)
    
    return (
        <Flex justify='center'>
            <HoverCard.Root>
                <HoverCard.Trigger>
                    <Box>
                        <Skeleton loading={status === 'loading'}>
                            <Avatar 
                                src={session?.user.image || ''} 
                                fallback={<PersonIcon className={classNames({'!w-9 !h-9': expand})} />} 
                                className={classNames({
                                    '!w-20 !h-20': expand
                                })}
                                radius='full'
                            />
                        </Skeleton>
                    </Box>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <DataList.Root>
                        <DataList.Item>
                            <Text size='4' weight='medium'>User Details</Text>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>ID</DataList.Label>
                            <DataList.Value>
                                <Text>{session?.user.id}</Text>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Name</DataList.Label>
                            <DataList.Value>
                                <Text>{session?.user.name}</Text>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label>Username</DataList.Label>
                            <DataList.Value>
                                <Text>{session?.user.username}</Text>
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                    <Separator my='4' size='4' />
                    <Flex gap='4' justify='between'>
                        <Link href={`/users/${session?.user.id}`}> {/*Refactor */}
                            <Button variant='soft'>Edit</Button>
                        </Link>
                        <Button variant='soft' color='red'>Log out</Button>
                    </Flex>
                </HoverCard.Content>
            </HoverCard.Root>
        </Flex>
    )
}
