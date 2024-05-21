'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const client = new QueryClient()

export default function QueryClientProvider({ children }: PropsWithChildren) {
    return (
        <ReactQueryClientProvider client={client}>
            {children}
        </ReactQueryClientProvider>
    )
}