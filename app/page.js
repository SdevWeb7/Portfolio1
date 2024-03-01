"use client"

import { QueryClient, QueryClientProvider } from "react-query";
import { QueryComponent } from "../src/component/QueryComponent";

export default function Home() {

  const queryClient = new QueryClient()


  return (
     <QueryClientProvider client={queryClient}>
      <main>

         <QueryComponent />

      </main>
     </QueryClientProvider>
  );
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