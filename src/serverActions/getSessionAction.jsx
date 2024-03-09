"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const getSessionAction = async () => {
   return  await getServerSession(authOptions)
}