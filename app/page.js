import prisma from '../src/prisma'
import Link from "next/link";
import {mois} from '../src/utils'
import { LikeModule } from "../src/component/LikeModule";
import { getServerSession } from "next-auth";
import { authOptions } from "../src/auth";


export default async function Home() {

   const session = await getServerSession(authOptions)
   const videos = await prisma.video.findMany({
      include: {
         category: {select: {name: true}},
         likes: {select: {fromUser: {select: {email: true}}}},
         fromUser: {select: {email: true}}
      },
      orderBy: {
         createdAt: 'desc'
      }
   })


  return <main>
     <h1>Nouveautés</h1>

     <h1 className={'text-red-600 fontsize-5 margin-4 paddin-1'}>Malvina</h1>

     <section className="videos">

     {videos && videos.map(v => {
        const videoId = v.url.split('=')[1]
        const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

        return <article key={v.id} className={'video'}>
           <Link
               href={v.url}
               target={'_blank'}>

           <section
              className="thumbnail"
              style={{backgroundImage: `url(${thumbnailURL})`}}>
           </section>

           <p>{v.category.name} - {v.createdAt.getDate()} {mois[v.createdAt.getMonth()-1]} {v.createdAt.getFullYear()}</p>

           <h2>{v.name}</h2>
        </Link>

           <LikeModule video={v} session={session} />
        </article>
     })}

     </section>
      </main>
}

/*
* import { Resend } from 'resend';

const resend = new Resend('re_ggi9iPCr_DAicuV3MufGWE3r6SJFF5tH7');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'veustyle93310@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
* */