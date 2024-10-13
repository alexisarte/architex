import NavBar from "@/components/NavBar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeModeScript } from "flowbite-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <head>
          <ThemeModeScript />
        </head>
        <body>
          <NavBar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
