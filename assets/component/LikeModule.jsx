"use client"

import { IconLike } from "/assets/svg/IconLike";
import toast from "react-hot-toast";
import { IconUnLike } from "/assets/svg/IconUnLike";
import { useState } from "react";
import { likeAction } from "/actions/likeAction";

export function LikeModule ({video, session}) {
   const [liked, setLiked] = useState(
      video.likes.find(l => l.fromUser.email === session?.user?.email ? true : false))


   const handleLike = async(videoID) => {
      const result = await likeAction(videoID)

      if (result?.serverError) {
         toast.error('Il y a eu une erreur, assurez vous d\'être connecté avant d\' ajouter une vidéo aux favoris')
      } else {
         toast.success(result)
         setLiked(v => !v)
      }
   }

   return (
      <>
      {liked ? <p className={'like'}>
                  Vous aimez cette vidéo
                  <IconUnLike
                     onClick={() => handleLike(video.id)} /></p> :
         <IconLike
         className={'like'}
         onClick={() => handleLike(video.id)} />}
      </>
   )
}