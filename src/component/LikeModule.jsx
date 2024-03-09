"use client"

import { IconLike } from "../svg/IconLike";
import toast from "react-hot-toast";
import { IconUnLike } from "../svg/IconUnLike";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function LikeModule ({video, session}) {
   const [liked, setLiked] = useState(false)
   const router = useRouter()

   useEffect(() => {
      if (session) {
         if (video.likes.find(l => l.fromUser.email === session.user?.email)) {
            setLiked(true)
         }
      }
   }, [])


   const handleLike = (videoID, method) => {
      if (!session) {
         toast.error('Veuillez vous connecter avant d\'ajouter des vidéos en favoris')
         return null
      }
      fetch(`/api/like/${videoID}`, {method: method}).then(r => {
         if (!r.ok) {
            toast.error('Problème serveur')
            throw new Error('Problème serveur')
         }
         return r.json()
      }).then(data => {
         let message = method === "POST" ? "ajoutée" : "supprimée"
         toast.success('La vidéo a été ' + message + ' aux favoris')
         window.location.href = window.location.pathname
      })
   }

   return (
      <>
      {liked ? <p className={'like flex gap-4'}>
                  Vous aimez cette vidéo
                  <IconUnLike
                     onClick={() => handleLike(video.id, 'DELETE')} /></p> :
         <IconLike
         className={'like'}
         onClick={() => handleLike(video.id, "POST")} />}
      </>
   )
}