import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "/src/auth";
import prisma from '/src/prisma'

export async function POST (request, context) {

    const session = await getServerSession(authOptions)

    const video = await prisma.video.findFirst({
        where: {id: context.params.videoId}
    })

    const like = await prisma.like.create({
        data: {
            fromUser: {connect: {email: session.user.email}},
            toVideo: {connect: {id: video.id}}
        }
    })
    return NextResponse.json('success')

}

export async function DELETE (request, context) {

    let result = ''
    const session = await getServerSession(authOptions)
    const video = await prisma.video.findFirst({
        where: {id: context.params.videoId}
    })

    const like = await prisma.like.findFirst({
        where: {
            fromUser: { email: session.user.email },
            toVideo: { id: video.id }
        }
    });
    if (like) {
        result = await prisma.like.delete({
            where: {id: like.id}
        })
    }
    return NextResponse.json(result)

}