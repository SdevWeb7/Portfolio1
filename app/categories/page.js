"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { LikeModule } from "../../src/component/LikeModule";

export default function Categories () {
   const [categoryName, setCategoryName] = useState("Humour")
   const [videos, setVideos] = useState([])
   const [session, setSession] = useState()

   useEffect(() => {
      fetch('/api/me').then(r => r.json()).then(d => setSession(d))
   }, [])

   useEffect(() => {
      fetch(`/api/categories/${categoryName}`)
         .then(r => r.json())
         .then(d => setVideos(d))
   }, [categoryName])


   return <main className={'categories'}>

      <h1>Catégories</h1>

      <nav>
         <button
            onClick={() => setCategoryName('Reportage')}>Reportage</button>
         <button
            onClick={() => setCategoryName('Film')}>Film</button>
         <button
            onClick={() => setCategoryName('Humour')}>Humour</button>
         <button
            onClick={() => setCategoryName('Divers')}>Divers</button>
      </nav>

      <section className={'videos'}>
      {videos.map(v => {
         const videoId = v.url.split('=')[1]
         const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`
         const arrayDate = v.createdAt.split('-')
         let annee = arrayDate[0]
         let mois = arrayDate[1]
         // Fonctionne, mais pas logique
         let jour = arrayDate[2][0]+arrayDate[2][1]



         return <article key={v.id} className={'video'}>
            <Link
               href={v.url}
               target={'_blank'}>

               <section
                  className="thumbnail"
                  style={{backgroundImage: `url(${thumbnailURL})`}}>
               </section>

               <p>{v.category.name} - {jour} {mois} {annee}</p>

               <h2>{v.name}</h2>
            </Link>

            <LikeModule session={session} video={v} />
         </article>
      })}
      </section>
   </main>
}