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
          <Navigation />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
