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
  "Neness — Car Detailing San Diego | Mobile Automotive Preservation Specialist";
export const SITE_DESCRIPTION =
  "Neness is San Diego's mobile car detailing and automotive preservation specialist. Expert detailing, paint correction, and interior restoration for classic and exotic automobiles — performed at your home, office, or private collection.";
export const SITE_KEYWORDS = [
  "car detailing San Diego",
  "detallado de autos San Diego",
  "mobile car detailing",
  "automotive preservation",
  "classic car detailing",
  "exotic car detailing",
  "Neness",
  "San Diego auto detailing",
];

export const OG_IMAGE = {
  url: `${SITE_URL}/neness/hero.jpg`,
  width: 1200,
  height: 675,
  alt: "A classic automobile in dramatic studio light — Neness automotive preservation",
};
