import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

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
    locale: "en_GB",
    siteName: "Functional Enterprises",
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
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
