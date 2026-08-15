import Image from "next/image";
import { Video as VideoIcon } from "lucide-react";

// === HERO MEDIA — set ONE line to bring in real footage ===
// Video wins if both are set. Leave both null to keep the styled placeholder.
// Shot direction: one exceptional car (classic or exotic), dark studio,
// single dramatic light source, paint reflections. A tight, mysterious crop
// (a body line, a headlight, the hood) reads more exclusive than the whole
// car. No hands, no polishers, no foam, no one working — this is the
// result, not the process.
const HERO_VIDEO_SRC: string | null = "/neness/hero.mp4";
const HERO_IMAGE_SRC: string | null = "/neness/hero.jpg"; // Ken Burns fallback if no video

export default function HeroMedia() {
  if (HERO_VIDEO_SRC) {
    return (
      // object-position shifts the crop right so the car sits away from the
      // bottom-left headline. Source has a watermark baked into the
      // bottom-right corner — that's masked by CategoryGrid's cover flap
      // (see CategoryGrid.tsx), not by zooming this video.
      // Mobile gets its own (taller, narrower) crop bias — same video file,
      // just framed closer to how porsche.com/usa crops its hero on phones:
      // biased up/center so the lower band stays clear for the headline.
      <video
        className="absolute inset-0 h-full w-full object-cover object-[50%_38%] md:object-[62%_50%]"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    );
  }

  if (HERO_IMAGE_SRC) {
    return (
      <Image
        src={HERO_IMAGE_SRC}
        alt="A vintage luxury automobile in dramatic studio light — Neness car preservation, San Diego"
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover object-[72%_48%] motion-reduce:animate-none"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Placeholder — hero video or image"
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_50%_40%,#161616_0%,#0a0a0a_70%)] px-6"
    >
      <VideoIcon size={26} className="text-muted/50" aria-hidden="true" />
      <div className="max-w-[46ch] text-center">
        <p className="text-meta text-muted/70">Hero video placeholder</p>
        <p className="text-body mt-3 text-muted/50">
          One car. Dark studio. One light source. A tight, mysterious crop —
          not the whole car. No hands, no polishers, no process.
        </p>
        <p className="text-meta mt-4 text-muted/35">
          Set HERO_VIDEO_SRC or HERO_IMAGE_SRC in HeroMedia.tsx
        </p>
      </div>
    </div>
  );
}
