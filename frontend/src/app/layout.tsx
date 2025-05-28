import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserRolesProvider } from '../context/authContext';
import "./globals.css";
import Navbar from "./components/navBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ".Next News",
  description: "Seek and share the latest news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <UserRolesProvider>
          <Navbar/>
          {children}
        </UserRolesProvider>
      </body>
    </html>
  );
}
