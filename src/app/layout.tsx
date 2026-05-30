import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Captionhall | Premium Content & Caption Creator Tools",
  description: "Instantly generate viral Instagram captions, YouTube titles, high-reach hashtags, fancy text styles, and blog title hooks. 100% free, client-side tool library.",
  keywords: ["Instagram caption generator", "YouTube title generator", "Hashtag creator", "Fancy text generator", "Blog title generator", "free social media tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
