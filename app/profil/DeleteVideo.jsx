"use client"

import { IconDelete } from "/src/svg/IconDelete";
import toast from "react-hot-toast";
import { deleteVideoAction } from "../../src/serverActions/deleteVideo";

export function DeleteVideo ({video}) {

   const deleteVideo = async() => {
      const result = await deleteVideoAction({videoId: video.id})

      if (result.serverError) {
         toast.error(result.serverError)
      } else {
         toast.success('La vidéo a été supprimée')
      }
   }

   return <IconDelete
             onClick={deleteVideo}
             className={'delete'} />
}