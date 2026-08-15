import { ArrowRight } from "lucide-react";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background"
    >
      <div data-anim="hero-media" className="absolute inset-x-0 -top-[4%] h-[108%]">
        <HeroMedia />
      </div>

      {/* Constant text scrim: anchored bottom-left (where the headline/CTA
          sit), fading to transparent toward the top-right. This holds
          steady regardless of what's playing behind it, so bright frames
          in the video never wash out the white text — without darkening
          the shot as a whole. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.22) 50%, transparent 70%)",
        }}
      />
      <div
        data-anim="hero-darken"
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />

      {/* Mobile: bottom-anchored with a fixed ~1cm gap to the hero's edge —
          constant across every phone height, since it's a fixed unit, not
          vh-based. Desktop (md:) restores the original layout, untouched. */}
      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-end px-[28px] pb-[1cm] md:px-[1cm] md:pb-[22.1vh]">
        <div className="max-w-[300px] md:max-w-[900px]">
          <h1 className="text-display-xl text-foreground">
            {/* pb + matching -mb on these two: the line-reveal mask (overflow-hidden)
                was clipping the descenders on "Preserving" (g) and "exceptional" (p).
                Padding-bottom gives the glyph room inside the mask; the equal negative
                margin cancels it back out so line spacing is untouched — same
                interlineado as before, g/p just aren't cut off anymore. */}
            <span className="block overflow-hidden pb-[0.3em] -mb-[0.3em]">
              <span data-anim="headline-line" className="inline-block">
                Preserving
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.3em] -mb-[0.3em]">
              <span data-anim="headline-line" className="inline-block">
                exceptional
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-anim="headline-line" className="inline-block">
                automobiles
              </span>
            </span>
          </h1>

          <p
            data-anim="hero-meta"
            className="mt-4 max-w-[300px] font-sans text-[15px] leading-[1.45] text-foreground/80 md:mt-6 md:max-w-[56ch] md:text-[18px] md:leading-[1.5]"
          >
            Expert care performed at your place on your schedule.
          </p>

          <a
            href="https://book.squareup.com/appointments/tukvgrsqkgp0mb/location/LFWNM1A2FV7J6/services"
            target="_blank"
            rel="noopener noreferrer"
            data-anim="hero-meta"
            className="group mt-3 inline-flex items-center gap-2 border-b border-foreground/50 pb-1.5 font-sans text-[15px] font-medium leading-[1.6] text-foreground transition-colors hover:border-foreground md:mt-9 md:text-[16px]"
          >
            Book now
            <ArrowRight
              size={16}
              className="text-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
