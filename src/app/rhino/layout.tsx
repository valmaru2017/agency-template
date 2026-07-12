import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./rhino.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter-rhino",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rhino Construction",
  description: "Fix & flip contractors. Houston, TX.",
};

export default function RhinoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
