"use client"

import { IconLike } from "../svg/IconLike";
import toast from "react-hot-toast";
import { IconUnLike } from "../svg/IconUnLike";
import { useEffect, useState } from "react";

export function LikeModule ({video, session}) {
   const [liked, setLiked] = useState(false)

   useEffect(() => {
      if (session) {
         if (video.likes.find(l => l.fromUser.email === session.user.email)) {
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
         window.location.href = "/"
      })
   }

   return (
      <>
      {liked ?
         <IconUnLike
            className={'like'}
            onClick={() => handleLike(video.id, 'DELETE')} /> :
         <IconLike
         className={'like'}
         onClick={() => handleLike(video.id, "POST")} />}
      </>
   )
}