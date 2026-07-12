import Image from "next/image";

const RITUALS = [
  {
    image: "/delfos/ritual-1.jpg",
    name: "The Deep Warmth",
    duration: "75 MIN",
    price: "$165",
    body: "A slow, full-body massage built around heated bamboo and sustained pressure, easing tension held in the shoulders and back.",
  },
  {
    image: "/delfos/ritual-2.jpg",
    name: "Volcanic Stone",
    duration: "90 MIN",
    price: "$195",
    body: "Hot volcanic stones settle into the muscle, releasing deep-seated tightness while the body sinks into stillness.",
  },
  {
    image: "/delfos/ritual-3.jpg",
    name: "The Renewal Facial",
    duration: "60 MIN",
    price: "$140",
    body: "A restorative facial ritual combining warm compress, gentle massage, and botanical actives for lasting radiance.",
  },
];

export default function Rituals() {
  return (
    <section id="rituals" className="delfos-section bg-background">
      <div className="mx-auto max-w-[1440px] px-5 md:px-14">
        <div
          data-anim="section-header"
          className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="text-meta text-accent">RITUALS</p>
            <h2 className="text-display-l mt-4 text-foreground">
              Three ways to slow down.
            </h2>
          </div>
          <p className="text-body max-w-[38ch] text-muted">
            Every ritual is performed one-on-one, in a private room, with
            time built in before and after to simply rest.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
          {RITUALS.map((ritual) => (
            <article key={ritual.name} data-anim="service-card">
              <figure
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src={ritual.image}
                  alt={ritual.name}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover"
                />
              </figure>

              <div className="mt-6 flex items-baseline justify-between border-t border-foreground/10 pt-4">
                <h3 className="text-display-m text-foreground">
                  {ritual.name}
                </h3>
                <span className="text-meta shrink-0 pl-4 text-muted">
                  {ritual.duration}
                </span>
              </div>

              <p className="text-body mt-3 text-muted">{ritual.body}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-body font-medium text-foreground">
                  {ritual.price}
                </span>
                <a
                  href="#book"
                  className="text-meta text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  BOOK &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
