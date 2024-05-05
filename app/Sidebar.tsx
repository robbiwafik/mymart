'use client'

import { DashboardIcon, HamburgerMenuIcon, TableIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

export default function Sidebar() {
    const [ expand, setExpand ] = useState(true)
    const currentPath = usePathname()

    const items: {
        label: string,
        Icon: ReactNode,
        href: string
    }[] = [
        { label: 'Dashboard', Icon: <DashboardIcon />, href: '/'},
        { label: 'Categories', Icon: <TableIcon />, href: '/categories/list'}
    ]

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
