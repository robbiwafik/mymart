import NextAuth from 'next-auth'
import { apiAuthProvider } from './auth'

const handler = NextAuth(apiAuthProvider)

export { handler as GET, handler as POST }

