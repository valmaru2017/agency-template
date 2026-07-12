import Image from "next/image";

const SPACES = [
  { image: "/delfos/space-1.jpg", number: "01", label: "Treatment Room" },
  { image: "/delfos/space-2.jpg", number: "02", label: "Arrival Lounge" },
  { image: "/delfos/space-3.jpg", number: "03", label: "Relaxation Area" },
  { image: "/delfos/space-4.jpg", number: "04", label: "The Garden" },
  { image: "/delfos/space-5.jpg", number: "05", label: "Bathing Room" },
];

export default function TheSpace() {
  return (
    <section id="the-space" className="delfos-section bg-surface-warm">
      <div className="mx-auto max-w-[1440px] px-5 md:px-14">
        <div
          data-anim="section-header"
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-meta text-accent">THE SPACE</p>
            <h2 className="text-display-l mt-4 text-foreground">
              Five rooms, one pace.
            </h2>
          </div>
          <p className="text-meta hidden text-muted md:block">01 &ndash; 05</p>
        </div>

        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:snap-none md:grid-cols-5 md:overflow-visible">
          {SPACES.map((space) => (
            <article
              key={space.number}
              data-anim="project-card"
              className="w-[78vw] shrink-0 snap-start md:w-auto"
            >
              <figure
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src={space.image}
                  alt={space.label}
                  fill
                  sizes="(min-width: 768px) 20vw, 78vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-dark/60 to-transparent" />
                <span className="absolute left-4 top-4 text-meta text-background">
                  {space.number}
                </span>
                <figcaption className="text-body absolute bottom-4 left-4 text-background">
                  {space.label}
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
