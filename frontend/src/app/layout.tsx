import NavBar from "@/components/NavBar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeModeScript } from "flowbite-react";

export const metadata = {
  title: "Architex",
  description: "Esta es mi soprendente herramienta de arquitectura",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="bg-slate-400">
          <ThemeModeScript />
          <NavBar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
