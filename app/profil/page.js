import { getServerSession } from "next-auth";
import { authOptions } from "../../src/auth";

export default function Profil () {
   const session = getServerSession(authOptions)
   if (!session) {}

   return <main>
      <h1>Gérer mes vidéos</h1>




   </main>
}