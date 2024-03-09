"use server"

import { authenticatedAction } from "./safeActions";
import { editVideoSchemas } from "../yupSchemas";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const editVideoAction = authenticatedAction(
   editVideoSchemas,
   async function (video, userEmail) {
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
)