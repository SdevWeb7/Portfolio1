"use client"

import { useSearchParams } from "next/navigation";
import { main } from "prisma/preinstall";

export default function Error () {
   const params = useSearchParams()

   console.log(params)

   return <main>

      <h1>Il y a eu une erreur</h1>
   </main>
}