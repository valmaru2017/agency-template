import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./domulux.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter-domulux",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Domulux",
  description: "Corretaje inmobiliario boutique. Bogotá.",
};

export default function DomuluxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
