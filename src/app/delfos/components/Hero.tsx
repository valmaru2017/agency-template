import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
    >
      <div
        data-anim="hero-photo"
        className="absolute inset-0"
      >
        <Image
          src="/delfos/hero.jpg"
          alt="Warm hands performing a therapeutic massage at Delfos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-surface-dark/45" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-14">
        <div className="max-w-[640px] py-24 md:py-0">
          <h1 className="text-display-xl text-background">
            <span className="block overflow-hidden">
              <span data-anim="headline-line" className="inline-block">
                A quiet space
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-anim="headline-line" className="inline-block">
                for the body.
              </span>
            </span>
          </h1>

          <p className="text-body-l mt-7 max-w-[46ch] text-background/85">
            Ritual-based treatments rooted in touch, warmth, and unhurried
            time. Delfos is a place to arrive and simply be tended to.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#book"
              className="bg-accent px-8 py-4 font-sans text-[15px] font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Book a Ritual
            </a>
            <a
              href="#rituals"
              className="font-sans text-[15px] font-medium text-background underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              View Rituals &rarr;
            </a>
          </div>
        </div>
      </div>

      <div
        data-anim="hero-meta"
        className="absolute bottom-8 right-5 hidden text-right md:right-14 md:block"
      >
        <p className="text-meta text-background/70">OPEN TODAY</p>
        <p className="text-body mt-2 text-background">10:00 &ndash; 20:00</p>
      </div>
    </section>
  );
}
