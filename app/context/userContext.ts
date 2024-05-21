import { User } from '@prisma/client'
import { createContext, Dispatch, SetStateAction } from 'react'

interface UserContextType {
    user: User | undefined,
    setUser: Dispatch<SetStateAction<User | undefined>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)
UserContext.displayName = 'UserContext'

export default UserContext