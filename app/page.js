import prisma from '../src/prisma'
import Link from "next/link";

export default async function Home() {

   const videos = await prisma.video.findMany()


  return <main>
     <h1>Nouveautés</h1>


     <section className="videos">

     {videos && videos.map(v => {
        const videoId = v.url.split('=')[1]
        const thumbnailURL = `https://img.youtube.com/vi/${videoId}/0.jpg`

        return <Link
                  href={v.url}
                  target={'_blank'}
                  key={v.id}
                  className={'video'}
                  style={{backgroundImage: `url(${thumbnailURL})`}}>
           <p>{v.name}</p>
        </Link>
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