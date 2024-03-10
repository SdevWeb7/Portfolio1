"use server"


import { serverAction } from "./safeActions";
import { findVideosByCategorySchemas } from "/lib/yupSchemas";
import prisma from "/lib/prisma";

export const findVideosByCategory = serverAction(
   findVideosByCategorySchemas,
   async function ({categoryName}) {
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
)