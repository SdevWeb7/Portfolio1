"use client"

import { IconDelete } from "/src/svg/IconDelete";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function DeleteVideo ({video}) {

   const router = useRouter()

   const deleteVideo = () => {
      fetch(`/api/videos/${video.id}`, {
         method: 'DELETE'
      }).then(r => r.json())
         .then(d => {
            toast.success('La vidéo a bien été supprimée')
            router.refresh()
         })
   }

   return <IconDelete
             onClick={deleteVideo}
             className={'delete'} />
}