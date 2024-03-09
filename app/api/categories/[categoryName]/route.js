import prisma from '../../../../src/prisma'
import { NextResponse } from "next/server";

export async function GET (request, context) {

   const videos = await prisma.video.findMany({
      where: {
         category: {
            is: {name: context.params.categoryName}
         }
      },
      include: {
         category: true,
         likes: {
            select: {
               fromUser: true
            }
         }
      }
   })

   return NextResponse.json(videos)
}