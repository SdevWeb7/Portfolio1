"use client"

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editVideoSchemas } from "/lib/yupSchemas";
import toast from "react-hot-toast";
import { editVideoAction } from "/actions/editVideoAction";
import { deleteVideoAction } from "../../actions/deleteVideo";
import { IconDelete } from "../../assets/svg/IconDelete";
import { useRef, useState } from "react";
import { IconEdit } from "../../assets/svg/IconEdit";

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
   const [disabledName, setDisabledName] = useState(true)
   const [disabledUrl, setDisabledUrl] = useState(true)
   const inputNameRef = useRef(null)
   const inputUrlRef = useRef(null)
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
      setDisabledName(true)
      setDisabledUrl(true)
   }

   const deleteVideo = async() => {
      const result = await deleteVideoAction({videoId: video.id})

      if (result.serverError) {
         toast.error(result.serverError)
      } else {
         toast.success('La vidéo a été supprimée')
      }
   }

   return <form>

      <div
         style={{backgroundImage: `url(${thumbnailURL})`}}
         className="container-img"></div>


      <div className="input">
         <Controller
            name="name"
            control={control}
            defaultValue={video.name}
            render={({ field }) => (
               <><input
                  ref={inputNameRef}
                  type="text"
                  onBlur={handleSubmit(editVideo)}
                  onChange={field.onChange}
                  value={field.value}
                  className={"name"}
                  disabled={disabledName} />
                  {errors.name && <p>{errors.name.message}</p>}</>
         )} />

         <IconEdit
            onClick={() => {
               setDisabledName(false)
               inputNameRef.current.focus()
            }}/>
      </div>


      <div className="input">
         <Controller
            name="url"
            control={control}
            defaultValue={video.url}
            render={({ field }) => (
               <><input
                  ref={inputUrlRef}
                  className={"url"}
                  type="text"
                  onBlur={handleSubmit(editVideo)}
                  onChange={field.onChange}
                  value={field.value}
                  disabled={disabledUrl}/>
                  {errors.url && <p>{errors.url.message}</p>}</>
            )} />
         <IconEdit
            onClick={() => {
               setDisabledUrl(false)
               inputUrlRef.current.focus()
            }}/>
      </div>


      <button
         className={'btn'}
         onClick={deleteVideo}>
            Supprimer</button>

   </form>
}
