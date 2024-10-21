import NavBar from "@/components/NavBar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeModeScript } from "flowbite-react";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <Head>
          <ThemeModeScript />
        </Head>
        <body className="bg-slate-400">
          <NavBar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
