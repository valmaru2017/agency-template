import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid min-h-[85vh] max-w-[1280px] grid-cols-1 items-stretch gap-10 px-5 pt-[72px] md:grid-cols-12 md:gap-8 md:px-12"
    >
      <div className="flex flex-col justify-center py-12 md:col-span-7 md:py-0">
        <p data-anim="hero-meta" className="text-meta text-muted">
          FIX &amp; FLIP CONTRACTORS · HOUSTON, TX
        </p>

        <h1 className="text-display-xl mt-6 text-foreground">
          <span className="block overflow-hidden">
            <span data-anim="headline-line" className="inline-block">
              Renovations that move properties.
            </span>
          </span>
        </h1>

        <p className="text-body-l mt-8 max-w-[50ch] text-foreground">
          Full-service remodeling for investors and homeowners. Kitchens,
          bathrooms, full flips — delivered on time, on budget.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-8">
          <a
            href="#contact"
            className="rounded bg-foreground px-8 py-4 font-sans text-[16px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Get a Free Quote
          </a>
          <a
            href="tel:+17135550142"
            className="font-sans text-[16px] font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Call (713) 555-0142 →
          </a>
        </div>
      </div>

      <div className="md:col-span-5">
        <div
          data-anim="hero-photo"
          className="relative h-full min-h-[360px] w-full overflow-hidden"
          style={{ aspectRatio: "4 / 5" }}
        >
          <Image
            src="/rhino/hero.jpg"
            alt="Modern kitchen renovation by Rhino Construction"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
