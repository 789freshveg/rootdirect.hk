import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://rootdirect.example"),
  title: site.title,
  description: site.description,
  keywords: [...site.keywords],
  openGraph: {
    title: site.title,
    description: site.description,
    locale: "zh_HK",
    type: "website",
    siteName: `${site.name} ${site.nameEn}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe1",
  width: "device-width",
  initialScale: 1,
};

const fontLinks = [
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@500;700;900&display=swap",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <head>
        {fontLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="grain relative min-h-screen antialiased">
        <Header />
        <main className="pb-14 md:pb-0">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
