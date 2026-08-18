import type { CSSProperties } from "react";
import Image from "next/image";

// Shared between the mobile (below the photo) and desktop (overlaid on the
// photo) renderings so the copy only lives in one place. Split into two
// paragraphs — the second sentence stands as its own point.
const PRESERVATION_COPY_P1 = (
  <>
    Automobile preservation is a specialized service dedicated to the care
    of classic, exotic, and collectible automobiles. These are vehicles in
    which condition, originality, and craftsmanship matter. Our expertise
    includes the proper care of vintage paint, delicate finishes, leather,
    and original upholstery, using methods suited to the age, materials, and
    character of each automobile.
  </>
);

const PRESERVATION_COPY_P2 = (
  <>
    We bring our expertise directly to your home, private garage, or
    preferred location, providing a discreet and highly personalized
    service while eliminating the need to transport your automobile to a
    traditional detailing facility.
  </>
);

// Logo files for the four concours events in the marquee, kept in the
// order supplied. Each file has been cropped so its visible mark (seal/
// emblem) reaches the canvas edge — no leftover padding baked in — and
// `width`/`height` below are that cropped file's real pixel dimensions.
// Passing the true intrinsic size lets a single fixed CSS height (see
// LogoMarquee) scale every logo's actual artwork to the same visual size,
// instead of scaling mismatched amounts of empty margin along with it.
// Repeated to fill a single track; the track itself is then rendered twice
// side by side (see LogoMarquee) so the CSS animation can loop seamlessly.
const CONCOURS_EVENTS: {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  // Per-logo visual-weight correction on top of the shared base height —
  // La Jolla and British Car Day still read slightly smaller than the
  // other two at equal pixel height (thinner linework / more internal
  // whitespace in the mark itself), so they get a small boost here.
  scale: number;
}[] = [
  {
    id: "amelia-island",
    name: "Amelia Island Concours d'Elegance",
    logo: "/neness/logos/1.png",
    width: 3568,
    height: 2099,
    scale: 1,
  },
  {
    id: "british-car-day",
    name: "British Car Day — Dayton, Ohio",
    logo: "/neness/logos/2.png",
    width: 3642,
    height: 2158,
    scale: 1.18,
  },
  {
    id: "la-jolla",
    name: "La Jolla Concours d'Elegance",
    logo: "/neness/logos/3.png",
    width: 3571,
    height: 2580,
    scale: 1.18,
  },
  {
    id: "dayton-carillon",
    name: "Dayton Concours d'Elegance at Carillon Park",
    logo: "/neness/logos/4.png",
    width: 3524,
    height: 1268,
    scale: 1,
  },
];

function LogoMarquee() {
  const track = Array.from({ length: 6 }, () => CONCOURS_EVENTS).flat();

  return (
    // Same width as the heading above (max-w-[720px]) plus 1cm of extra
    // tolerance on each side, so the logos visibly start/end near where the
    // heading starts/ends — not at the section's full edge-to-edge width.
    <div className="relative mx-auto mt-10 max-w-[calc(720px+2cm)] overflow-hidden md:mt-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent md:w-28" />

      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex items-center"
          >
            {track.map((event, i) => (
              <Image
                key={`${dup}-${i}`}
                src={event.logo}
                alt={event.name}
                width={event.width}
                height={event.height}
                style={
                  {
                    "--h-mobile": `calc(56px * ${event.scale})`,
                    "--h-desktop": `calc(84px * ${event.scale})`,
                  } as CSSProperties
                }
                className="mx-8 h-[var(--h-mobile)] w-auto shrink-0 grayscale opacity-70 md:mx-14 md:h-[var(--h-desktop)]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Recognition() {
  return (
    // Pulled up over the hero's bottom-right corner to hide the video's
    // watermark there (measured ~20–55px above the hero's bottom edge on
    // desktop) — relative + z-10 lifts it above the hero's video/scrim
    // layers. Desktop-only: on mobile the hero's video crop (see
    // HeroMedia.tsx's object-position) keeps that corner out of frame
    // entirely, and pulling up there would instead cut into the H1/subtitle.
    <section
      id="recognition"
      className="relative z-10 bg-white px-5 pb-8 pt-8 text-ink md:-mt-[100px] md:px-12 md:pb-10 md:pt-10"
    >
      <div className="content-shell">
        <h2 className="text-recognition-heading mx-auto max-w-[720px] text-center text-ink">
          Automobiles entrusted to Neness have gone on to earn honors at
          these events.
        </h2>

        <LogoMarquee />
      </div>

      {/* Full-bleed: breaks out of content-shell to run edge-to-edge of the
          viewport. Photo is shown at its full, uncropped native aspect
          (w-full h-auto — no fill/object-fit) so nothing is ever cut off;
          height is whatever that produces. On mobile the text sits below
          the photo in normal flow (image is short/wide, leaving no room to
          overlay readable text on it). At md: the text becomes an absolute
          overlay living in the SAME full-bleed (0–100vw) coordinate space
          as the image — not nested inside content-shell — so a vw-based
          padding-left can position it a fixed 2cm past the car's right
          edge (the car occupies roughly the left 26vw of the full photo)
          regardless of viewport width. */}
      <div className="relative mt-24 md:mt-32">
        <div className="relative left-1/2 hidden w-screen -translate-x-1/2 bg-black md:block">
          <Image
            src="/neness/fer.png"
            alt="Close-up of a red Ferrari's front fender and wheel — Neness exotic car preservation, San Diego"
            width={5057}
            height={1255}
            sizes="100vw"
            className="h-auto w-full"
          />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[calc(560px+4cm)] ml-[calc(26vw+3cm)] text-left">
              <p className="font-sans text-[18px] leading-[1.7] text-foreground/85">
                {PRESERVATION_COPY_P1}
              </p>
              <p className="mt-4 font-sans text-[18px] leading-[1.7] text-foreground/85">
                {PRESERVATION_COPY_P2}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: no photo (source crop doesn't read well that narrow) —
            just the same near-black tone used elsewhere on the site
            (bg-background), full-bleed, with the copy in light text. */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 bg-background px-5 py-10 md:hidden">
          <p className="max-w-[640px] font-sans text-[16px] leading-[1.7] text-foreground/80">
            {PRESERVATION_COPY_P1}
          </p>
          <p className="mt-4 max-w-[640px] font-sans text-[16px] leading-[1.7] text-foreground/80">
            {PRESERVATION_COPY_P2}
          </p>
        </div>
      </div>
    </section>
  );
}
