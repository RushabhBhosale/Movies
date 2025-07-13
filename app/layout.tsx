import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SwrProvider } from "@/utils/swr-config";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import HydrateUser from "@/lib/hydrateZustandUser";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineTrack – Track Your Movie & Series Watchlist",
  description:
    "CineTrack helps you track movies and TV shows you're watching, completed, paused, or dropped. Built with Next.js and TMDB integration for posters, ratings, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SwrProvider>
          <HydrateUser token={token} />
          {children}
          <Toaster />
          <Analytics />
        </SwrProvider>
      </body>
    </html>
  );
}
