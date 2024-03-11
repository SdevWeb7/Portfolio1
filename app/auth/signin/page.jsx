"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IconGithub } from "../../../assets/svg/IconGithub";
import { IconMail } from "../../../assets/svg/IconMail";
import { IconGoogle } from "../../../assets/svg/IconGoogle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchemas } from "../../../lib/yupSchemas";

export default function Page () {
   const params = useSearchParams()
   const errors = params.get('error') || null
   const {register, handleSubmit, formState: {errors: emailError}} = useForm({
      mode: "onBlur",
      resolver: yupResolver(emailSchemas)
   })

   const handleLoginByEmail = (data) => {
      console.log(data)
   }

   return <main className="auth">
      <h1>Connexion</h1>

      {errors && Object.keys(errors).length > 0 &&
         <h2>Il y a eu un problème</h2>}


      <form onSubmit={handleSubmit(handleLoginByEmail)}>
         <label htmlFor="email">Entrez votre addresse e-mail</label>
         <input
            {...register('email')}
            id={"email"}
            type="text"
            placeholder={'example@example.com'} />

         {emailError.email && <p className={"errors"}>{emailError.email.message}</p>}

         <button
            className={"email"}
            type={'submit'}>
               <IconMail /> Connexion par E-mail</button>
      </form>


      <h3>OU</h3>

      <button
         className={"google"}
         onClick={async() => {
         await signIn('google', {callbackUrl: '/'})
      }
      }><IconGoogle /> Connexion avec Google</button>

      <button
         className={"github"}
         onClick={async() => {
         await signIn('github', {callbackUrl: '/'})
      }
      }><IconGithub /> Connexion avec Github</button>
   </main>
}