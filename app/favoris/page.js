import Link from "next/link";
import { mois } from "../../src/utils";
import { LikeModule } from "../../src/component/LikeModule";
import { getServerSession } from "next-auth";
import { authOptions } from "../../src/auth";
import { redirect } from "next/navigation";
import prisma from "../../src/prisma";

export default async function Favoris () {

   const session = await getServerSession(authOptions)
   if (!session) {
      redirect('/')
   }

   const videos = await prisma.video.findMany({
      where: {
         likes: {
            some: {
               fromUser: {email: session.user.email}
            }
         }
      },
      include: {
         category: true
      }
   })


   return <><h1>Mes favoris</h1>

      <section className="videos">

      {videos && videos.map(video => {
         const videoId = video.url.split('=')[1]
         const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

         return <article key={video.id} className={'video'}>
            <Link
               href={video.url}
               target={'_blank'}>

               <section
                  className="thumbnail"
                  style={{backgroundImage: `url(${thumbnailURL})`}}>
               </section>

               <p>{video.category.name} - {video.createdAt.getDate()} {mois[video.createdAt.getMonth()-1]} {video.createdAt.getFullYear()}</p>

               <h2>{video.name}</h2>
            </Link>
         </article>
      })}

   </section></>
}