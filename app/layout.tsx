import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoTrader - Dashboard",
  description: "AutoTraderInc is an AI-powered automated trading platform using OrionAI to analyze global markets and financial instruments in real time. It executes smart trades across stocks, ETFs, and crypto, helping investors optimize portfolios, reduce risk, and capitalize on market opportunities with advanced algorithmic precision.",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    'theme-color': '#0c2780',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmSans.variable}  ${inter.variable} antialiased`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${ibmSans.variable} antialiased`}>
        {children}

        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}