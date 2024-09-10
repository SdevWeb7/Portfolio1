"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newVideoSchemas } from "/lib/yupSchemas";
import { addVideo } from "/actions/addVideoAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { findCategories } from "/actions/findCategories";

export function Form ({session}) {
   const router = useRouter()
   const [categories, setCategories] = useState([])
   const {register, handleSubmit,
      formState: {isValid, isSubmitting, errors}} = useForm({
         mode: 'onBlur',
         resolver: yupResolver(newVideoSchemas),
         defaultValues: {
            categorie: 'Divers'
         }
   })

   useEffect(() => {
      const find = async() => {
         let result = await findCategories()
         if (result.serverError) {
            toast.error('il y a eu une erreur dans le chargement des catégories')
         } else {
            setCategories(result)
         }
      }
      find()
   }, [])

   const onSubmit = async(data) => {
      const result = await addVideo(data)

      if (result.serverError) {
         toast.error(result.serverError)
      } else {
         toast.success('La vidéo a été ajoutée')
         router.push('/')
      }
   }

   if (!session?.user?.email) router.push('/')

   else return <form
                  className={'form'}
                  onSubmit={handleSubmit(onSubmit)}>

         <label htmlFor="name">Nom de la vidéo</label>
         <input
            type="text"
            placeholder={'Nom de la vidéo'}
            id={'name'}
            {...register("name")} />
         {errors.name && <span className={'errors'}>
                     {errors.name.message}</span>}


         <label htmlFor="description">Description de la vidéo</label>
         <input
            type="text"
            placeholder={'Description de la vidéo'}
            id={'description'}
            {...register("description")} />
         {errors.description && <span className={'errors'}>
                     {errors.description.message}</span>}


         <label htmlFor="categorie">Catégorie</label>
         <select
            name="categorie"
            id="categorie"
            {...register('categorie')}>
            {categories && categories.map(c => {
               return <option key={c.id} value={c.name}>{c.name}</option>
            })}
         </select>


         <label htmlFor="url">Lien de la vidéo</label>
         <input
            type="text"
            placeholder={'Lien de la vidéo'}
            id={'url'}
            {...register("url")} />
         {errors.url && <span className={'errors'}>{errors.url.message}</span>}

         <button
            className={'btn'}
            disabled={isSubmitting || !isValid}>
            Valider
         </button>
      </form>
}