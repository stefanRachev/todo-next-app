import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Моето приложение за Todo списъци и разход на пелети",
  description:
    "Управлявайте задачите си за деня, списъците за покупки и следете разхода за пелети. Вижте прогреса към 1 тон пелети и планирайте ефективно разходите за сезона.",
  keywords:
    "Todo списъци, задачи, пелети, разход за пелети, прогрес, списък за покупки",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            <meta name="author" content="Stefan Rachev" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta
              property="og:url"
              content="https://todo-next-app-stefan-rachevs-projects.vercel.app/"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta
              name="google-site-verification"
              content="google-site-verification=QptWgK9wLF-QicBJvmKNiv9PiSwP-Iw3DoZ6vTNDslQ"
            />
          </Head>
          <Navigation />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
