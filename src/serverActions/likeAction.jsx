"use server"


import { authenticatedAction } from "./safeActions";
import { likeSchemas } from "../yupSchemas";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const likeAction = authenticatedAction(
   likeSchemas,
   async function ({videoId}, userEmail) {
      let result;
      const like = await prisma.like.findFirst({
         where: {
            fromUser: { email: userEmail },
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
               fromUser: {connect: {email: userEmail}},
               toVideo: {connect: {id: videoId}}
            }
         })
         result = "La vidéo a été ajoutée aux favoris"
      }
      revalidatePath('/')
      return result
   }
)