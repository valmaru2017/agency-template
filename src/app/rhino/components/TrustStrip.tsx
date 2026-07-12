const ITEMS = [
  "LICENSED & INSURED",
  "15+ YEARS EXPERIENCE",
  "200+ PROJECTS COMPLETED",
  "FREE ESTIMATES",
];

export default function TrustStrip() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-[60px] md:px-12">
      <h2 className="sr-only">Why contractors trust Rhino</h2>
      <div className="grid w-full grid-cols-1 divide-y divide-foreground/[0.12] md:grid-cols-4 md:divide-x md:divide-y-0">
        {ITEMS.map((item) => (
          <p
            key={item}
            className="px-0 py-4 text-center font-sans text-[14px] font-medium text-foreground md:px-6 md:py-0"
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
