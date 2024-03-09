import { NextResponse } from "next/server";
import prisma from '/src/prisma'

export async function GET (request, context) {

   const result = await prisma.video.findMany({
      where: {
         name: {
            contains: context.params.searchKey,
         }
      },
      include: {
         category: {
            select: { name: true }
         }
      },
      take: 10
   })

   return NextResponse.json(result)
}