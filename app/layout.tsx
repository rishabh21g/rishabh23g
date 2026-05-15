import type { Metadata } from "next";
import { Geist_Mono ,Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionConfig } from "framer-motion";

 const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

//Setup Geist Mono for mono and sans
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishabhiitm.me"),
  title: {
    default: "Rishabh Gupta | Software Engineer",
    template: "%s | Rishabh Gupta",
  },
  description: "Software Engineer | Trying to be a better one.",
  keywords: [
    "Rishabh Gupta",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Resume",
    "Golang",
    "Node.js",
    "TypeScript",
    "JavaScript",
  ],
  authors: [{ name: "Rishabh Gupta", url: "https://rishabhiitm.me" }],
  creator: "Rishabh Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rishabhiitm.me",
    title: "Rishabh Gupta | Software Engineer",
    description: "Software Engineer | Trying to be a better one.",
    siteName: "Rishabh Gupta Portfolio",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Gupta - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Gupta | Software Engineer",
    description: "Software Engineer | Trying to be a better one.",
    creator: "@rishabh21g",
    images: ["og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,       // Inject Inter CSS variable
        geistMono.variable,   // Inject Geist Mono CSS variable
        "font-sans"           // Ensures your globally defined sans font is the default
      )}
    >
      <body className="min-h-full flex flex-col dark theme-default">
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}