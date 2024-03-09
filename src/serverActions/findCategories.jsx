"use server"

import { serverAction } from "./safeActions";
import prisma from "../prisma";

export const findCategories = serverAction(
   {},
   async() => {
      const categories = await prisma.category.findMany()

      return categories

   }
)