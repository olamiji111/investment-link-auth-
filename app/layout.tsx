import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";


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
  title: "Plus500BOT-signIN",
  description: "Plus500BOT - secure, efficient and intelligent trading platform offering stocks, ETFS, crypto wallets, real-time market data, and AI powered auto-trading for investors. Manage trades, track portfolios, and make informed financial decisions covertly with ease, trading tools for a seamless investment experience.",
  icons: {},
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
      </body>
    </html>
  );
}