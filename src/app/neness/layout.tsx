import type { Metadata } from "next";
import { Carlito, Inter, Montserrat } from "next/font/google";
import "./neness.css";
import {
  SITE_PATH,
  SITE_PAGE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  BUSINESS_NAME,
  BUSINESS_LEGAL_NAME,
  BUSINESS_PHONE_E164,
  BUSINESS_CITY,
  BUSINESS_REGION,
  BUSINESS_AREA_SERVED,
  OG_IMAGE,
} from "./seo-config";

// LocalBusiness/AutomotiveBusiness structured data — lets Google show rich
// results (name, phone, service area, service catalog) in search. Neness is
// a mobile detailing service with no public storefront, so this
// deliberately omits streetAddress and openingHours: neither is published
// anywhere on the site, and guessing either would show incorrect info in
// search results.
const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: BUSINESS_NAME,
  legalName: BUSINESS_LEGAL_NAME,
  url: SITE_PAGE_URL,
  image: OG_IMAGE.url,
  telephone: BUSINESS_PHONE_E164,
  priceRange: "$$",
  areaServed: {
    "@type": "City",
    name: BUSINESS_CITY,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_REGION,
    addressCountry: "US",
  },
  description: `Mobile vintage and luxury car preservation specialist serving ${BUSINESS_AREA_SERVED}, offering mobile paint correction and detailing at the client's home, office, or private collection.`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Preservation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Maintenance Preservation",
          description:
            "Mobile car detailing and paint decontamination wash for vintage and luxury automobiles.",
          areaServed: BUSINESS_CITY,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Signature Preservation",
          description:
            "Mobile paint correction, decontamination, and protective finishing for vintage and luxury automobiles.",
          areaServed: BUSINESS_CITY,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Stewardship",
          description:
            "An exclusive ongoing care program for private vintage and luxury car collections, by consultation.",
          areaServed: BUSINESS_CITY,
        },
      },
    ],
  },
};

// Calibri itself is a Microsoft-licensed font and can't be embedded as a
// web font. Carlito is Google's metric-compatible, freely-licensed stand-in
// for it — visually near-identical. "Calibri" still leads the stack below,
// so it renders natively for any visitor who already has it installed.
const carlito = Carlito({
  variable: "--font-carlito",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter-neness",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Desktop-only hero H1 override — see .text-display-xl in neness.css.
const montserrat = Montserrat({
  variable: "--font-montserrat-neness",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: SITE_PATH,
  },
  openGraph: {
    type: "website",
    url: SITE_PAGE_URL,
    siteName: BUSINESS_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NenessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // No <html>/<body> here — the root layout (src/app/layout.tsx) already
  // owns those. Rendering a second set caused the browser to silently
  // normalize the nested tags, which is what produced the hydration warning.
  return (
    <div
      className={`${carlito.variable} ${inter.variable} ${montserrat.variable} neness-root antialiased`}
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
      />
      {children}
    </div>
  );
}
