"use server"



import prisma from "/lib/prisma";

export const findVideosByCategory = async function ({categoryName}) {
      const videos = await prisma.video.findMany({
         where: {
            category: {
               is: {name: categoryName}
            }
         },
         include: {
            category: {select: {name: true}},
            likes: {
               select: {
                  fromUser: {select: {email: true}}
               }
            }
         }
      })

      return videos
}
