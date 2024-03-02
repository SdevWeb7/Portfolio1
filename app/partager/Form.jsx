"use client"

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newVideoSchemas } from "../../src/yupSchemas";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Form () {
   const {register, handleSubmit, formState: {isValid, isSubmitting, errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(newVideoSchemas),
      defaultValues: {
         categorie: 'Humour'
      }
   })
   const {data: categories} = useQuery('categories', async () => {
      return fetch('/api/categories/all').then(r => r.json())
   })
   const router = useRouter()


   const onSubmit = async (data) => {
      fetch('/api/videos', {
         method: 'POST',
         body: JSON.stringify(data)
      }).then(r => {
         if (!r.ok) {
            toast.error('Problème serveur')
            throw new Error('Problème serveur')
         } else {
            toast.success('La vidéo a bien été ajoutée')
            router.push('/')
         }
      })
   }

   return  <form className={'form'} onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="name">Nom de la vidéo</label>
      <input
         type="text"
         placeholder={'Nom de la vidéo'}
         id={'name'}
         {...register("name")} />
      {errors.name && <span className={'errors'}>{errors.name.message}</span>}


      <label htmlFor="description">Description de la vidéo</label>
      <input
         type="text"
         placeholder={'Description de la vidéo'}
         id={'description'}
         {...register("description")} />
      {errors.description && <span className={'errors'}>{errors.description.message}</span>}


      <label htmlFor="categorie">Catégorie</label>
      <select
         name="categorie"
         id="categorie"
         {...register('categorie')}>
         {categories && categories.map(c => {
            return <option key={c.id} value={c.name}>{c.name}</option>
         })}
      </select>


      <label htmlFor="lien">Lien de la vidéo</label>
      <input
         type="text"
         placeholder={'Lien de la vidéo'}
         id={'lien'}
         {...register("lien")} />
      {errors.lien && <span className={'errors'}>{errors.lien.message}</span>}

      <button
         className={'btn'}
         disabled={isSubmitting || !isValid}>
         Valider
      </button>
   </form>
}