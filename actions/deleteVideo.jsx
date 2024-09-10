"use server"


import { revalidatePath } from "next/cache";
import prisma from "/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const deleteVideoAction = async function (videoId) {
   const session = await getServerSession(authOptions);
   if (!session) {
      return {serverError: true}
   }

      await prisma.video.delete({
         where: {
            id: videoId,
            fromUser: {email: session.user.email}
         }
      })
      revalidatePath('/')
   }
