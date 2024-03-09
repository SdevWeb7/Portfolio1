"use client"

import { DeleteVideo } from "./DeleteVideo";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editVideoSchemas } from "../../src/yupSchemas";
import toast from "react-hot-toast";
import { useState } from "react";

export function EditVideo ({video}) {
   const {handleSubmit, control, formState: {errors, isValid}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(editVideoSchemas),
      defaultValues: {
         name: video.name,
         url: video.url
      }
   })


   const editVideo = (data) => {
      fetch(`/api/videos/${video.id}`, {
         method: 'PATCH',
         body: JSON.stringify(data)
      }).then(r => r.json())
         .then(d => {
            toast.success('La vidéo a bien été modifiée')
         }).catch(e => toast.error('Il y a eu une erreur'))
   }

   return <form>

      <Controller
         name="name"
         control={control}
         defaultValue={video.name}
         render={({ field }) => (
            <><input
               type="text"
               onBlur={handleSubmit(editVideo)}
               onChange={field.onChange}
               value={field.value}
               className={"name"} />
               {errors.name && <p>{errors.name.message}</p>}</>
         )} />

      <Controller
         name="url"
         control={control}
         defaultValue={video.url}
         render={({ field }) => (
            <><input
               className={"url"}
               type="text"
               onBlur={handleSubmit(editVideo)}
               onChange={field.onChange}
               value={field.value} />
               {errors.url && <p>{errors.url.message}</p>}</>
         )} />
      <DeleteVideo video={video} />

   </form>
}