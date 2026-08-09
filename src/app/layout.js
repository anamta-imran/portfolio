import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Anamta Imran | Full Stack Web Developer",
  description:
    "Anamta Imran is a Full Stack Web Developer specializing in Laravel, PHP, Node.js, MERN Stack, Next.js, React.js, and Redux.",
  keywords: [
    "Anamta Imran",
    "Full Stack Web Developer",
    "Laravel",
    "Next.js",
    "MERN",
    "React",
    "Node.js",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "Anamta Imran | Full Stack Web Developer",
    description:
      "Anamta Imran is a Full Stack Web Developer specializing in Laravel, PHP, Node.js, MERN Stack, Next.js, React.js, and Redux.",
    type: "website",
    locale: "en_US",
    siteName: "Anamta Imran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anamta Imran | Full Stack Web Developer",
    description:
      "Anamta Imran is a Full Stack Web Developer specializing in Laravel, PHP, Node.js, MERN Stack, Next.js, React.js, and Redux.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          ["--font-display"]: "var(--font-syne), system-ui, sans-serif",
          ["--font-body"]: "var(--font-dm-sans), system-ui, sans-serif",
          ["--font-mono"]: "var(--font-jetbrains), ui-monospace, monospace",
        }}
      >
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
