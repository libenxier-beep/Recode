import type { Metadata } from "next";
import { Newsreader, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { siteConfig } from "@/lib/site-config";

const newsreader = Newsreader({
  variable: "--font-serif-latin",
  subsets: ["latin"],
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-serif-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${newsreader.variable} ${notoSerifSc.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-text-primary">
        <div className="site-grid min-h-screen">
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
