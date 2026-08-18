// Single source of truth for every SEO-facing value (metadata, sitemap,
// robots, JSON-LD). Change the business/domain facts here once instead of
// hunting through layout.tsx, sitemap.ts, robots.ts, and the JSON-LD block.

// Confirmed production domain — drives the canonical tag, OG/Twitter urls,
// sitemap, and robots.txt, since everything below is derived from this one
// constant.
export const SITE_URL = "https://www.neness.com";
export const SITE_PATH = "/neness";
export const SITE_PAGE_URL = `${SITE_URL}${SITE_PATH}`;

export const BUSINESS_NAME = "Neness";
export const BUSINESS_LEGAL_NAME = "Neness Automotive Preservation";
export const BUSINESS_PHONE = "858-224-2312";
export const BUSINESS_PHONE_E164 = "+18582242312";
export const BUSINESS_EMAIL = "alberto@neness.com";
export const BUSINESS_CITY = "San Diego";
export const BUSINESS_REGION = "CA";
// Matches the footer's travel-fee note — same three counties, kept in one
// place so JSON-LD and any future copy can't drift out of sync with it.
export const BUSINESS_AREAS_SERVED = [
  "San Diego County",
  "Orange County",
  "Los Angeles County",
];

export const SITE_TITLE = "Exotic & Classic Car Detailing San Diego | Neness";
export const SITE_DESCRIPTION =
  "Mobile luxury detailing for classic, exotic, and collector cars in San Diego. Concours-level paint care, brought to your home or private collection.";

// Primary terms carry the meta description/title; secondary terms round out
// the <meta name="keywords"> list (low SEO weight today, but harmless and
// used by some directories/aggregators that still read it).
export const SITE_KEYWORDS = [
  // Primary
  "exotic car detailing San Diego",
  "classic car detailing San Diego",
  "luxury car detailing San Diego",
  "mobile car detailing San Diego",
  "collector car detailing",
  "paint correction San Diego",
  "car preservation San Diego",
  // Secondary
  "Porsche detailing San Diego",
  "Ferrari detailing San Diego",
  "exotic car detailing Orange County",
  "exotic car detailing Los Angeles",
];

export const OG_IMAGE = {
  url: `${SITE_URL}/neness/hero.jpg`,
  width: 1200,
  height: 675,
  alt: "A vintage luxury automobile in dramatic studio light — Neness mobile car preservation, San Diego",
};
