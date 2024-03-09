"use server"


import { serverAction } from "./safeActions";
import { findVideosByCategorySchemas } from "../yupSchemas";
import prisma from "../prisma";

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