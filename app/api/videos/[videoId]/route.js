// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../src/auth";
// import prisma from "../../../../src/prisma";
//
// export async function DELETE (request, context) {
//
//    const session = await getServerSession(authOptions)
//
//    if (!session) {
//       return NextResponse.json('Accès non autorisé')
//    }
//
//    await prisma.video.delete({
//       where: {
//          id: context.params.videoId,
//          fromUser: {email: session.user.email}
//       }
//    })
//
//    return NextResponse.json('success')
// }
//
// export async function PATCH (request, context) {
//    const session = await getServerSession(authOptions)
//
//    if (!session) {
//       return NextResponse.json('Accès non autorisé')
//    }
//
//    const data = await request.json()
//    const video = await prisma.video.update({
//       where: {
//          id: context.params.videoId,
//          fromUser: {email: session.user.email}
//       },
//       data: {
//          name: data.name,
//          url: data.url
//       }
//    })
//    return NextResponse.json(video)
//
// }