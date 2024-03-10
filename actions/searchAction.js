"use server"

import { serverAction } from "./safeActions";
import { searchSchemas } from "/lib/yupSchemas";
import prisma from "/lib/prisma";

export const searchVideo = serverAction(
   searchSchemas,
   async function ({searchKey}) {
      const result = await prisma.video.findMany({
         where: {
            name: {
               contains: searchKey,
            }
         },
         include: {
            category: {
               select: { name: true }
            }
         },
         take: 10
      })
      return result
   }
)