'use client'

import { User } from '@prisma/client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import UserContext from '../userContext'

export default function UserProvider({ children }: PropsWithChildren) {
    const { status, data: session } = useSession()
    const [ user, setUser ] = useState<User>()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/users/${session?.user.id}`)
            setUser(data)
        }

        if (status === 'authenticated')
            fetchData()

    }, [status, session?.user.id])
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}