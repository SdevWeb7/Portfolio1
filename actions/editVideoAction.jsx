"use server"


import prisma from "/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const editVideoAction = async function (video) {
      const session = await getServerSession(authOptions);
      if (!session) {
         return {serverError: true}
      }

      await prisma.video.update({
         where: {
            id: video.id,
            fromUser: {email: session.user.email}
         },
         data: {
            ...video
         }
      })
      revalidatePath('/')
      return "La vidéo a été modifiée"
   }
