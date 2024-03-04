import { FormWrapper } from "./FormWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../../src/auth";

export default async function Partager () {

   const session = await getServerSession(authOptions)

   return <>
      <h1>Partager une vidéo</h1>
      <FormWrapper session={session} /></>
}