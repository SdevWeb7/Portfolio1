"use server"

import prisma from "/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const likeAction = async function (videoId) {
      let result;
      const session = await getServerSession(authOptions);
      if (!session) {
         return {serverError: true}
      }

      const like = await prisma.like.findFirst({
         where: {
            fromUser: { email: session.user.email },
            toVideo: { id: videoId }
         }
      });
      if (like) {
         await prisma.like.delete({
            where: {id: like.id}
         })
         result = "La vidéo a été retirée des favoris"
      } else {
         await prisma.like.create({
            data: {
               fromUser: {connect: {email: session.user.email}},
               toVideo: {connect: {id: videoId}}
            }
         })
         result = "La vidéo a été ajoutée aux favoris"
      }
      revalidatePath('/')
      return result
}
