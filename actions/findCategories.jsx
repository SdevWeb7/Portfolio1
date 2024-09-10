"use server"

import prisma from "/lib/prisma";

export const findCategories = async() => {
      const categories = await prisma.category.findMany()

      return categories

   }