"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LikeModule } from "/assets/component/LikeModule";
import { findVideosByCategory } from "/actions/findVideosByCategory";
import { getSessionAction } from "/actions/getSessionAction";
import { findCategories } from "/actions/findCategories";
import { mois } from "/lib/utils";

export default function Categories () {
   const [session, setSession] = useState()
   const [videos, setVideos] = useState([])
   const [categories, setCategories] = useState([])
   const [categoryName, setCategoryName] = useState("Informatique")

   useEffect(() => {
      const findVideos = async() => {
         const session = await getSessionAction()
         const result = await findVideosByCategory(categoryName)
         const categories = await findCategories()

         setVideos(result)

         setSession(session)
         setCategories(categories)
      }
      findVideos()
   }, [categoryName])


   return <main className={'categories'}>

      <h1>Catégories</h1>

      <nav>
         {categories.length > 0 ? categories.map(c => {
            return <button
               key={c.name}
               onClick={() => setCategoryName(c.name)}>
                  {c.name}</button>
         }) : <p>Chargement...</p>}

      </nav>

      <section className={'videos'}>
      {videos.length > 0 ? videos.map(v => {
         const videoId = v.url.split('=')[1]
         const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`
         const jour = v.createdAt.getDate();
         const tempMois = v.createdAt.getMonth() + 1;
         const annee = v.createdAt.getFullYear();

         return <article key={v.id} className={'video'}>

            <LikeModule session={session} video={v} />

            <Link
               href={v.url}
               target={'_blank'}
               className="thumbnail"
               style={{backgroundImage: `url(${thumbnailURL})`}}>
            </Link>

               <p>{v.category.name} - {v.createdAt.getDate()} {mois[tempMois]} {v.createdAt.getFullYear()}</p>

               <h2>{v.name}</h2>

         </article>
      }) : <p>Aucun vidéo pour le moment...</p>}
      </section>
   </main>
}