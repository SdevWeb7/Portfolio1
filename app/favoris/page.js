import Link from "next/link";
import { mois } from "/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";
import { redirect } from "next/navigation";
import prisma from "/lib/prisma";
import { LikeModule } from "/assets/component/LikeModule";

export default async function Favoris () {

   const session = await getServerSession(authOptions)
   if (!session?.user?.email) {
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
         category: {select: {name: true}},
         likes: {
            select: {fromUser: {select: {email: true}}}
         }
      },
      orderBy: {createdAt: 'desc'}
   })


   return <main>
      <h1>Mes favoris</h1>
      <section className="videos">

      {videos.length > 0 ? videos.map(video => {
         const videoId = video.url.split('=')[1]
         const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

         return <article key={video.id} className={'video'}>

            <LikeModule
               session={session}
               video={video} />

            <Link
               href={video.url}
               target={'_blank'}
               className="thumbnail"
               style={{backgroundImage: `url(${thumbnailURL})`}}>
            </Link>

               <p>{video.category.name} - {video.createdAt.getDate()} {mois[video.createdAt.getMonth()-1]} {video.createdAt.getFullYear()}</p>

               <h2>{video.name}</h2>


         </article>
      }) : <p>Vous n&qpos;avez pas encore de favoris</p>}

   </section></main>
}