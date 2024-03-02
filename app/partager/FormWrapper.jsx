"use client"

import { QueryClient, QueryClientProvider } from "react-query";
import { Form } from "./Form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function FormWrapper ({session}) {
   const queryClient = new QueryClient()
   const router = useRouter()

   if (!session) {
      toast.success('Veuillez vous connectez pour partager une vidéo')
      router.push('/')
      return null
   } else {
      return <QueryClientProvider client={queryClient}>

            <Form />
      </QueryClientProvider>
   }
}
