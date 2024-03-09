"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { LikeModule } from "../../src/component/LikeModule";
import { findVideosByCategory } from "../../src/serverActions/findVideosByCategory";
import toast from "react-hot-toast";
import { getSessionAction } from "../../src/serverActions/getSessionAction";
import { findCategories } from "../../src/serverActions/findCategories";
import { mois } from "../../src/utils";

export default function Categories () {
   const [session, setSession] = useState()
   const [videos, setVideos] = useState([])
   const [categories, setCategories] = useState([])
   const [categoryName, setCategoryName] = useState("Humour")

   useEffect(() => {
      const findVideos = async() => {
         const session = await getSessionAction()
         const result = await findVideosByCategory({categoryName: categoryName})
         const categories = await findCategories()
         if (result.serverError) {
            toast.error(result.serverError)
         } else {
            setVideos(result.data)
         }
         setSession(session)
         setCategories(categories.data)
      }
      findVideos()
   }, [categoryName])


   return <main className={'categories'}>

      <h1>Catégories</h1>

      <nav>
         {categories.map(c => {
            return <button
               key={c.name}
               onClick={() => setCategoryName(c.name)}>
                  {c.name}</button>
         })}
      </nav>

      <section className={'videos'}>
      {videos.map(v => {
         const videoId = v.url.split('=')[1]
         const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`
         const jour = v.createdAt.getDate();
         const tempMois = v.createdAt.getMonth() + 1;
         const annee = v.createdAt.getFullYear();

         return <article key={v.id} className={'video'}>
            <Link
               href={v.url}
               target={'_blank'}>

               <section
                  className="thumbnail"
                  style={{backgroundImage: `url(${thumbnailURL})`}}>
               </section>

               <p>{v.category.name} - {v.createdAt.getDate()} {mois[tempMois]} {v.createdAt.getFullYear()}</p>

               <h2>{v.name}</h2>
            </Link>

            <LikeModule session={session} video={v} />
         </article>
      })}
      </section>
   </main>
}