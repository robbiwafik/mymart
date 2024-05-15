import mime from 'mime'
import prisma from '@/prisma/client'
import { randomBytes } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

interface Props {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: Props) {
    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        }
    })

    if (!user)
        return NextResponse.json(
            { error: 'Could not find a user with the given ID.'},
            { status: 404 }
        )
    
    return NextResponse.json({
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image
    })
}
