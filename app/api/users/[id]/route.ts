import mime from 'mime'
import prisma from '@/prisma/client'
import { randomBytes } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { editUserSchema } from '@/app/validationSchema'

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


export async function PATCH(req: NextRequest, { params }: Props) {
    const user = await prisma.user.findUnique({
        where: { id: params.id }
    })
    if (!user)
        return NextResponse.json({ error: 'Invalid user.'}, { status: 404 })

    const formData = await req.formData()

    const name = formData.get('name') as string
    const image = formData.get('image') as File

    const validation = editUserSchema.safeParse({name, image})
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })

    let imagePath;

    if (image) {
        imagePath = user.image ? join(process.cwd(), '/public', user.image) : imagePath
        if (imagePath && existsSync(imagePath))
            try {
                await unlink(imagePath)
            }
            catch(error: any) {
                console.log('Error while trying to remove an image.\n ', error)
                return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
            }
        
        const relativeUploadDir = '/uploads/user-images'
        const absoluteUploadDir = join(process.cwd(), '/public', relativeUploadDir)

        try {
            if (!existsSync(absoluteUploadDir))
                await mkdir(absoluteUploadDir, { recursive: true })
        }
        catch (error: any) {
            console.log('Error while trying to create uploads directory when uploading an image.\n ', error)
            return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
        }
        
        const imageExtension = mime.getExtension( image.type)
        const uniqueSuffix = randomBytes(16).toString('hex')
        const fileName = uniqueSuffix + '.' +  imageExtension

        const buffer = Buffer.from(await image.arrayBuffer())
        try {
            await writeFile(`${absoluteUploadDir}/${fileName}`, buffer)
        }
        catch(error: any) {
            console.log('Error while trying to remove an image.\n ', error)
            return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
        }
        
        imagePath = `${relativeUploadDir}/${fileName}`
    }

    const {password, ...editedUser} = await prisma.user.update({
        where: {id: user.id},
        data: {
            name,
            image: imagePath
        }
    })

    return NextResponse.json(editedUser)
}