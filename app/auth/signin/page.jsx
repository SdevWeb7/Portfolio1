"use client"

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IconGithub } from "../../../assets/svg/IconGithub";
import { IconMail } from "../../../assets/svg/IconMail";
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

   const handleLoginByEmail = async(data) => {
      return await signIn('email', {
         email: data.email,
         callbackUrl: '/'
      })
   }

   return <main className="auth">
      <h1>Connexion</h1>

      {errors && Object.keys(errors).length > 0 &&
         <h2>Il y a eu un problème</h2>}


      <form className={"form"} onSubmit={handleSubmit(handleLoginByEmail)}>
         <label htmlFor="email">Entrez votre adresse e-mail</label>
         <input
            {...register('email')}
            id={"email"}
            type="text"
            placeholder={'example@example.com'} />

         {emailError.email && <p className={"errors"}>
               {emailError.email.message}</p>}

         <button
            className={"email"}
            type={'submit'}>
               <IconMail /> Connexion par E-mail</button>
      </form>

      <div className="or">
         <div></div>
         <h3>OU</h3>
         <div></div>
      </div>

      {/*<button*/}
      {/*   className={"google"}*/}
      {/*   onClick={async() => {*/}
      {/*   await signIn('google', {callbackUrl: '/'})*/}
      {/*}*/}
      {/*}><IconGoogle /> Connexion avec Google</button>*/}

      <button
         className={"github"}
         onClick={async() => {
         await signIn('github', {callbackUrl: '/'})
      }
      }><IconGithub /> Connexion avec Github</button>
   </main>
}