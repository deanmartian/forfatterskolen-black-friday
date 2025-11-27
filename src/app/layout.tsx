import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "BLACK FRIDAY SALG - Opptil 58% rabatt på skrivekurs | Forfatterskolen",
  description: "Knallrabatt på Forfatterskolens mest populære skrivekurs! Årskurs, Romankurs og Barnebokkurs med opptil 58% rabatt. Tilbudet gjelder kun frem til 28. november kl 23:59. 14 dagers angrerett!",
  keywords: [
    "Forfatterskolen",
    "Black Friday",
    "skrivekurs",
    "rabatt",
    "årskurs",
    "romankurs",
    "barnebokkurs",
    "forfatter",
    "skriving",
    "kreativ skriving",
    "Norge"
  ],
  authors: [{ name: "Forfatterskolen" }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "BLACK FRIDAY SALG - Opptil 58% rabatt | Forfatterskolen",
    description: "Knallrabatt på våre mest populære skrivekurs! Årskurs, Romankurs og Barnebokkurs med opptil 58% rabatt. Spar opptil 7000 kr. Tilbudet utløper 28. november kl 23:59.",
    url: "https://forfatterskolen.no",
    siteName: "Forfatterskolen",
    type: "website",
    locale: "nb_NO",
    images: [
      {
        url: "https://ext.same-assets.com/1462340940/1938907275.png",
        width: 1200,
        height: 630,
        alt: "Forfatterskolen Black Friday Salg - Opptil 58% rabatt på skrivekurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACK FRIDAY SALG - Opptil 58% rabatt | Forfatterskolen",
    description: "Knallrabatt på våre mest populære skrivekurs! Spar opptil 7000 kr. Tilbudet utløper 28. november.",
    images: ["https://ext.same-assets.com/1462340940/1938907275.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
