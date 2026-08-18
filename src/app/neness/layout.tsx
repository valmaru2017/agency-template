import type { Metadata } from "next";
import { Cormorant, Manrope } from "next/font/google";
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
  BUSINESS_EMAIL,
  BUSINESS_CITY,
  BUSINESS_REGION,
  BUSINESS_AREAS_SERVED,
  OG_IMAGE,
} from "./seo-config";

// LocalBusiness/AutomotiveBusiness structured data — lets Google show rich
// results (name, phone, service area, service catalog) in search. Neness is
// a mobile detailing service with no public storefront, so this
// deliberately omits streetAddress and openingHours: neither is published
// anywhere on the site, and guessing either would show incorrect info in
// search results. addressLocality/Region below is the business's home base
// (no street address), paired with areaServed for the full service-area —
// the standard pattern Google recommends for mobile/service-area businesses.
const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: BUSINESS_NAME,
  legalName: BUSINESS_LEGAL_NAME,
  url: SITE_PAGE_URL,
  image: OG_IMAGE.url,
  telephone: BUSINESS_PHONE_E164,
  email: BUSINESS_EMAIL,
  priceRange: "$$$",
  areaServed: BUSINESS_AREAS_SERVED.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_REGION,
    addressCountry: "US",
  },
  description: `Mobile luxury, classic, and exotic car detailing and preservation specialist serving ${BUSINESS_AREAS_SERVED.join(", ")}, offering paint correction and paint decontamination at the client's home, office, or private collection.`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Preservation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Maintenance",
          description:
            "A meticulous interior cleaning and exterior hand wash for vintage, luxury, and collector automobiles, including paint decontamination and protective treatment designed to preserve the vehicle's finish and character.",
          areaServed: BUSINESS_AREAS_SERVED,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Signature",
          description:
            "A comprehensive interior and exterior rejuvenation for vintage and luxury automobiles, including paint decontamination, machine polishing, paint correction, and protective finishing.",
          areaServed: BUSINESS_AREAS_SERVED,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Stewardship",
          description:
            "A highly exclusive service reserved for nine private collections, each entrusted to the care of a dedicated professional guardian. By consultation.",
          areaServed: BUSINESS_AREAS_SERVED,
        },
      },
    ],
  },
};

// Titles (h1/h2/h3, service names) — light weight for a quieter, more
// luxury feel than the previous bold display face. Weights 400/500/600 are
// kept available for the handful of non-heading elements (award titles,
// the pull-quote) that intentionally opt into a heavier cut of this same
// family via font-semibold/font-bold.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Body copy, buttons, and nav — regular weight for running text, medium
// for anything interactive (buttons, nav links).
const manrope = Manrope({
  variable: "--font-manrope-neness",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${cormorant.variable} ${manrope.variable} neness-root antialiased`}
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
