"use server"

import { authenticatedAction } from "./safeActions";
import { deleteVideoSchemas } from "/lib/yupSchemas";
import { revalidatePath } from "next/cache";
import prisma from "/lib/prisma";

export const deleteVideoAction = authenticatedAction(
   deleteVideoSchemas,
   async function ({videoId}, userEmail) {
      await prisma.video.delete({
         where: {
            id: videoId,
            fromUser: {email: userEmail}
         }
      })
      revalidatePath('/')
   }
)