"use server"


import prisma from "/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export const addVideo = async(data) => {
         const session = getServerSession()
         if (!session) return {serverError: 'Vous devez être connecté pour ajouter une vidéo'}

         const category = await prisma.category.findFirst({
               where: {
                     name: data.get('categorie')
               }
         })
         await prisma.video.create({
               data: {
                     name: data.get('name'),
                     description: data.get('description'),
                     url: data.get("url"),
                     fromUser: {
                           connect: {email: session.user.email}
                     },
                     category: {
                           connect: { id: category.id }
                     }
               }

         })

      revalidatePath('/')
      }
