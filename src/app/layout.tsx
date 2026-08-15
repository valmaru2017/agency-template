import type { Metadata } from "next";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "./neness/seo-config";

// "/" immediately redirects to "/neness" (see page.tsx) — this metadata is
// the fallback any crawler or share-preview sees before that redirect
// resolves, so it mirrors the Neness page rather than staying generic.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
