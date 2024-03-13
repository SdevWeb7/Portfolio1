import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";
import { Form } from "./Form";

export default async function Partager () {

   const session = await getServerSession(authOptions)

   return <main>
      <h1>Partager une vidéo</h1>

      <Form session={session} /></main>
}