"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";

export const getSessionAction = async () => {
   return  await getServerSession(authOptions)
}