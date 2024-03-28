// import {NextResponse} from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../src/auth";
// import prisma from '../../../src/prisma'
//
// export async function POST (request) {
//
//     const session = await getServerSession(authOptions)
//     const data = await request.json()
//
//     const category = await prisma.category.findFirst({
//         where: {
//             name: data.categorie
//         }
//     })
//
//     const video = await prisma.video.create({
//         data: {
//             name: data.name,
//             description: data.description,
//             url: data.lien,
//             fromUser: {
//                 connect: {email: session.user.email}
//             },
//             category: {
//                 connect: { id: category.id }
//             }
//         }
//
//     })
//
//     return NextResponse.json('success')
//
// }