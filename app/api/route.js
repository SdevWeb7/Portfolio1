import { NextResponse } from "next/server";
import prisma from "../../src/prisma";

export const dynamic = 'force-dynamic'

export async function GET () {
   let datas = await prisma.user.findFirstOrThrow({
      where: {
         id: "1"
      },
      select: {
         name: true
      }
   })
   return NextResponse.json(datas)
}