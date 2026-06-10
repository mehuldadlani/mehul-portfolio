import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE = "https://mehuldadlani.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Mehul Dadlani — Product Engineer",
  description:
    "Product engineer who ships mobile end-to-end. Flutter at 100K+ user scale, a Web3 and security spine, and a string of hackathon wins. Based in Bangalore.",
  keywords: [
    "Mehul Dadlani",
    "Product Engineer",
    "Flutter Developer",
    "Web3",
    "Mobile Engineer",
    "Bangalore",
  ],
  authors: [{ name: "Mehul Dadlani" }],
  openGraph: {
    title: "Mehul Dadlani — Product Engineer",
    description:
      "Ships mobile end-to-end. Flutter at 100K+ scale, a Web3 + security spine, hackathon wins.",
    type: "website",
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehul Dadlani — Product Engineer",
    description:
      "Ships mobile end-to-end. Flutter at 100K+ scale, a Web3 + security spine, hackathon wins.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=nippo@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
