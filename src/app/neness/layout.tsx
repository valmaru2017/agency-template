import type { Metadata } from "next";
import { Carlito, Inter, Montserrat } from "next/font/google";
import "./neness.css";

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
  title: "Neness — Automotive Preservation Specialist",
  description:
    "Detailing, restoration & interior preservation for the vehicles that matter. San Diego.",
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
      {children}
    </div>
  );
}
