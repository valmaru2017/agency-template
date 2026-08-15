// Single source of truth for every SEO-facing value (metadata, sitemap,
// robots, JSON-LD). Change the business/domain facts here once instead of
// hunting through layout.tsx, sitemap.ts, robots.ts, and the JSON-LD block.

export const SITE_URL = "https://www.neness.com";
export const SITE_PATH = "/neness";
export const SITE_PAGE_URL = `${SITE_URL}${SITE_PATH}`;

export const BUSINESS_NAME = "Neness";
export const BUSINESS_LEGAL_NAME = "Neness Automotive Preservation";
export const BUSINESS_PHONE = "858-224-2312";
export const BUSINESS_PHONE_E164 = "+18582242312";
export const BUSINESS_CITY = "San Diego";
export const BUSINESS_REGION = "CA";
export const BUSINESS_AREA_SERVED = "San Diego County";

export const SITE_TITLE =
  "Neness | Vintage & Luxury Car Preservation — Mobile Detailing in San Diego";
export const SITE_DESCRIPTION =
  "Neness offers mobile car preservation in San Diego — expert paint correction and paint decontamination for vintage, classic, luxury, and exotic automobiles, performed at your home, office, or private collection.";

// Primary terms carry the meta description/title; secondary terms round out
// the <meta name="keywords"> list (low SEO weight today, but harmless and
// used by some directories/aggregators that still read it).
export const SITE_KEYWORDS = [
  // Primary
  "car preservation San Diego",
  "vintage car paint correction",
  "classic car paint decontamination",
  "vintage car detailing San Diego",
  "classic car detailing San Diego",
  "luxury car detailing San Diego",
  "exotic car detailing San Diego",
  // Secondary
  "mobile car detailing San Diego",
  "mobile auto detailing San Diego",
  "paint correction San Diego",
  "car detailing San Diego",
  "auto detailing San Diego",
];

export const OG_IMAGE = {
  url: `${SITE_URL}/neness/hero.jpg`,
  width: 1200,
  height: 675,
  alt: "A vintage luxury automobile in dramatic studio light — Neness mobile car preservation, San Diego",
};
