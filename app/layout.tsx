import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

/**
 * Display / headline font
 * Plus Jakarta Sans — geometric, confident, editorial.
 * Used for all headings and display text.
 */
const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Body font
 * DM Mono — technical, mono-adjacent, creates personality contrast against
 * the geometric display font. Used for body copy, captions, and UI labels.
 */
const bodyFont = DM_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Functional Enterprises — Web Design & Development Agency",
    template: "%s | Functional Enterprises",
  },
  description:
    "A web design and development agency building high-performance digital products for ambitious brands. Strategy, design, and engineering — end to end.",
  keywords: [
    "web design agency",
    "web development",
    "Next.js agency",
    "brand identity",
    "digital product studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Functional Enterprises",
    title: "Functional Enterprises — Web Design & Development Agency",
    description:
      "A web design and development agency building high-performance digital products for ambitious brands. Strategy, design, and engineering — end to end.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Functional Enterprises — Web Design & Development",
    description:
      "We build digital products that perform — not just impress. Web design, brand identity & digital growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
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
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full bg-background font-body antialiased">
        {children}
      </body>
    </html>
  );
}
