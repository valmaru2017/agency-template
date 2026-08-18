import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cormorant, Manrope } from "next/font/google";
// Pulls in Tailwind + the site's design tokens (--color-background,
// --color-foreground, --color-muted, .text-statement-wrap, .text-body-l,
// etc.) — the root layout never imports this, so without it this page
// would render fully unstyled (confirmed by screenshot before this fix).
import "./neness/neness.css";
import ShieldMark from "./neness/components/ShieldMark";

// Same variable names neness.css's `--font-display`/`--font-sans` expect,
// so `.text-statement-wrap`/`.text-body-l`/`font-sans` resolve to the real
// Cormorant/Manrope faces here too — this page can render for any
// unmatched URL on the site, not just under /neness, so it can't rely on
// neness/layout.tsx having already set these up.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300"],
});

const manrope = Manrope({
  variable: "--font-manrope-neness",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Next.js renders this for any unmatched route and still returns a real
// HTTP 404 status automatically — this file only controls what's shown,
// not the status code.
export default function NotFound() {
  return (
    <div
      className={`${cormorant.variable} ${manrope.variable} flex min-h-screen flex-col items-center justify-center bg-background px-5 py-20 text-center antialiased md:px-12 md:py-24`}
    >
      <ShieldMark className="h-10 w-auto md:h-12" />

      <h1 className="text-statement-wrap mt-10 text-foreground md:mt-12">
        This one got away.
      </h1>

      <p className="text-body-l mt-4 max-w-[46ch] text-muted md:mt-5">
        The page you&apos;re looking for doesn&apos;t exist — but your
        automobile deserves a second look either way.
      </p>

      <Link
        href="/neness"
        className="group mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2 font-sans text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 md:mt-12"
      >
        Return Home
        <ArrowRight
          size={14}
          className="text-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
