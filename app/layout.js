import "./globals.scss";
import { Header } from "/assets/component/Header";
import { SearchBar } from "/assets/component/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";
import { Toaster } from "react-hot-toast";
import { ThemeButton } from "../assets/component/ThemeButton";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Entertainment Web App",
  description: "Partage de vidéos",
};

export default async function RootLayout({ children }) {
   const session = await getServerSession(authOptions)

   return (
    <html lang="fr">
      <body>
        <Toaster position={'bottom-right'} />

        <Header session={session} />
        <SearchBar />

         <Suspense fallback={<Loading />}>
            {children}
         </Suspense>

         <ThemeButton />

      </body>
    </html>
  );
}
