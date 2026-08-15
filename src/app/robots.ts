import type { MetadataRoute } from "next";
import { SITE_URL } from "./neness/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // AI answer engines' retrieval/search bots — fetched on-demand when a
      // user asks a question, not used for training. Explicitly allowed so
      // Claude, ChatGPT, and Perplexity can read and cite this site.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
