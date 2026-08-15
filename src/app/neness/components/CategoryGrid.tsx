import { ArrowRight } from "lucide-react";
import MediaSlot from "./MediaSlot";

const CATEGORIES: {
  name: string;
  href: string;
  image: string;
  alt: string;
  imgClassName?: string;
}[] = [
  {
    name: "Maintenance",
    href: "#maintenance",
    image: "/neness/maintenance-foto2002.jpg",
    alt: "Close-up of a classic automobile's headlight and front fender — Neness maintenance detailing",
    imgClassName: "[filter:saturate(0.7)_brightness(0.85)_contrast(1.1)]",
  },
  {
    name: "Signature",
    href: "#signature",
    image: "/neness/restoration.jpg",
    alt: "A classic automobile under dramatic studio lighting — Neness signature detailing",
  },
  {
    name: "Stewardship",
    href: "#concours",
    image: "/neness/interiors.jpg",
    alt: "Close-up of a preserved leather interior and trim — Neness stewardship care",
  },
];

export default function CategoryGrid() {
  return (
    <section
      id="services"
      className="relative bg-surface-light px-5 pb-20 pt-20 md:px-12 md:pb-16 md:pt-28"
    >
      <h2
        data-anim="section-header"
        className="content-shell mb-10 text-center text-mobile-intro-heading text-ink md:mb-14"
      >
        Preservation Services
      </h2>

      <div className="content-shell grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {CATEGORIES.map((category) => (
          <a
            key={category.name}
            href={category.href}
            data-anim="tile"
            className="group relative h-[calc(128px+4cm)] w-full overflow-hidden rounded-[2rem] md:h-auto md:aspect-[5/4]"
          >
            <MediaSlot
              src={category.image}
              alt={category.alt}
              label={category.name}
              sizes="(min-width: 768px) 33vw, 100vw"
              imgClassName={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${category.imgClassName ?? ""}`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
              <h3 className="text-display-m text-foreground">{category.name}</h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/15 text-foreground backdrop-blur transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:bg-foreground/25">
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="content-shell mt-24 flex flex-col items-center">
        <p
          data-anim="section-header"
          className="max-w-[320px] text-center text-ink [font-family:var(--font-display)] text-[clamp(25px,4.6vw,44px)] font-bold leading-[1.15] md:max-w-none md:whitespace-nowrap"
        >
          Every automobile tells a story. Our job is to preserve it.
        </p>
        <span aria-hidden="true" className="mt-4 h-[2px] w-30 bg-ink" />
      </div>
    </section>
  );
}
