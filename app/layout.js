import "./globals.scss";
import { Header } from "../src/component/Header";
import { SearchBar } from "../src/component/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../src/auth";
import { Toaster } from "react-hot-toast";

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

        {children}

      </body>
    </html>
  );
}
