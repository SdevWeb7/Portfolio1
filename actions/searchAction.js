"use server"


import prisma from "/lib/prisma";

export const searchVideo = async function (searchKey) {
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
