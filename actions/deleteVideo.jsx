"use server"


import { revalidatePath } from "next/cache";
import prisma from "/lib/prisma";

export const deleteVideoAction = async function ({videoId}, userEmail) {
      await prisma.video.delete({
         where: {
            id: videoId,
            fromUser: {email: userEmail}
         }
      })
      revalidatePath('/')
   }
