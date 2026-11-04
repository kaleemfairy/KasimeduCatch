import type { Metadata, Viewport } from "next";
import { Anek_Tamil, Oswald, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const tamil = Anek_Tamil({ subsets: ["tamil"], variable: "--font-tamil" });

export const metadata: Metadata = {
  title: "SSS Seafood - Kasimedu Catch, Chennai",
  description:
    "Fresh fish bought off the boats at Kasimedu Fishing Harbour at dawn, cut to your order, packed on RO ice and delivered across Chennai. Order on WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#0D253F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${jakarta.variable} ${tamil.variable}`}>
      <body>{children}</body>
    </html>
  );
}
