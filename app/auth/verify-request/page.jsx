"use client"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmail () {

   const router = useRouter()
   toast.success('Veuillez cliquer sur le lien se trouvant dans le mail qui vient de vous être envoyé')
   router.push('/')
}