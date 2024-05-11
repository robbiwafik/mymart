import paths from '@/app/paths'
import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { SHA256 as sha256 } from 'crypto-js'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const apiAuthProvider: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', placeholder: 'Username'},
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password)
                    return null

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })

                if (!user)
                    return null

                return sha256(credentials.password).toString() === user.password ?
                    user : null
            }
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: paths.LOGIN_PAGE
    }
}

const handler = NextAuth(apiAuthProvider)

export { handler as GET, handler as POST }

