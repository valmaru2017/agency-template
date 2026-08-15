import Image from "next/image";
import { ImageIcon } from "lucide-react";

/**
 * Fills its parent (must be `relative` with a set aspect ratio/height).
 * Pass `src={null}` — the default state — to render a clearly-marked
 * placeholder instead of a broken image. Swap in real footage by setting
 * `image:` in the CATEGORIES / SERVICES data arrays that call this.
 */
export default function MediaSlot({
  src,
  alt,
  label,
  sizes = "100vw",
  priority,
  imgClassName,
}: {
  src?: string | null;
  alt: string;
  label: string;
  sizes?: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imgClassName ?? "object-cover"}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label}`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed border-foreground/15 bg-[radial-gradient(circle_at_50%_35%,var(--surface-graphite)_0%,var(--background)_75%)] p-6 text-center"
    >
      <ImageIcon size={20} className="text-muted/50" aria-hidden="true" />
      <span className="text-meta text-muted/60">{label}</span>
    </div>
  );
}
