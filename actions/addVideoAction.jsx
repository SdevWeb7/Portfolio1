"use server"


import prisma from "/lib/prisma";
import { revalidatePath } from "next/cache";

export const addVideo = async(data, userEmail) => {

         const category = await prisma.category.findFirst({
               where: {
                     name: data.categorie
               }
         })
         await prisma.video.create({
               data: {
                     name: data.name,
                     description: data.description,
                     url: data.url,
                     fromUser: {
                           connect: {email: userEmail}
                     },
                     category: {
                           connect: { id: category.id }
                     }
               }

         })

      revalidatePath('/')
      }
