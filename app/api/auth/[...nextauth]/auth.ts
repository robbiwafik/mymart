import paths from '@/app/paths'
import { hashPassword } from '@/app/utils/hash'
import prisma from '@/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
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

                return hashPassword(credentials.password).toString() === user.password ?
                    user : null
            }
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: paths.LOGIN_PAGE
    },
    callbacks: {
        async jwt({ token, trigger, user, session }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }

            if (trigger === 'update') {
                if (session.name)
                    token.name = session.name

                if (session.image)
                    token.picture = session.image
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.username = token.username
            }

            return session
        }
    }
}