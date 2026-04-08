import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Wonder Path Press',
    default: 'Wonder Path Press - Stories That Wander. Paths That Inspire.',
  },
  description: "Publishing quality books for the curious, the dreamers, and the seekers.",
  openGraph: {
    title: 'Wonder Path Press',
    description: 'Publishing quality books for the curious, the dreamers, and the seekers.',
    url: 'https://wonderpathpress.com',
    siteName: 'Wonder Path Press',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wonder Path Press',
    description: 'Publishing quality books for the modern reader.',
  },
  metadataBase: new URL('https://wonderpathpress.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans flex min-h-screen flex-col`}
      >
        {children}
        <Analytics />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-45MBJCEJK1" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-45MBJCEJK1');
          `}
        </Script>
      </body>
    </html>
  );
}
