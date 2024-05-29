import { Box, Card } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    maxWidth?: string
}

export default function FormCard({ maxWidth, children }: Props) {
    return (
        <Box maxWidth={maxWidth}>
            <Card className='!px-8 !py-5'>
                {children}
            </Card>
        </Box>
    )
}