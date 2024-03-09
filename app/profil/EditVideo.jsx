"use client"

import { DeleteVideo } from "./DeleteVideo";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editVideoSchemas } from "../../src/yupSchemas";
import toast from "react-hot-toast";
import { editVideoAction } from "../../src/serverActions/editVideoAction";

export function EditVideo ({video}) {
   const {handleSubmit, control,
      formState: {errors}} = useForm({
         mode: 'onBlur',
         resolver: yupResolver(editVideoSchemas),
         defaultValues: {
            name: video.name,
            url: video.url
         }
   })
   const videoId = video.url.split('=')[1]
   const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

   const editVideo = async(data) => {
      const result = await editVideoAction(
         {...data, id: video.id})

      if (result.serverError) {
         toast.error(result.serverError)
      } else {
         toast.success('La vidéo a été modifiée')
      }
   }

   return <form>
      <div
         style={{backgroundImage: `url(${thumbnailURL})`}}
         className="container-img"></div>

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