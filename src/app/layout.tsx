import type { Metadata, Viewport } from "next";
import { Anek_Tamil, Oswald, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const tamil = Anek_Tamil({ subsets: ["tamil"], variable: "--font-tamil" });

const title = "SSS Seafoods – Kasimedu Catch | Fresh Fish Delivery in Chennai";
const description =
  "Fresh fish, prawns, crabs and squid from Kasimedu Fishing Harbour, cleaned and cut to your order with free home delivery across Chennai. Order on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SSS Seafoods – Kasimedu Catch",
    title,
    description,
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kasimedu Catch: fresh seafood direct from Kasimedu Harbour" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0D253F" };

// Tells Google this is a local seafood shop, for Maps and "near me" searches.
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "SSS Seafoods – Kasimedu Catch",
  description,
  url: SITE.url,
  image: `${SITE.url}/og-image.jpg`,
  logo: `${SITE.url}/images/sss-seafood-logo.png`,
  telephone: `+${SITE.phoneE164}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 118, PV Kovil Street, Kasimedu, Royapuram",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600013",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Chennai" },
  priceRange: "₹₹",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${jakarta.variable} ${tamil.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        {children}
      </body>
    </html>
  );
}
