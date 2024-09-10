"use server"


import prisma from "/lib/prisma";
import { revalidatePath } from "next/cache";

export const editVideoAction = async function (video, userEmail) {
      await prisma.video.update({
         where: {
            id: video.id,
            fromUser: {email: userEmail}
         },
         data: {
            name: video.name,
            url: video.url
         }
      })
      revalidatePath('/')
   }
