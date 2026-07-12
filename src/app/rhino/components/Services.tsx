const SERVICES = [
  {
    number: "01",
    name: "Fix & Flip",
    body: "Full property renovations designed for maximum resale value. From demolition to staging-ready in 8-12 weeks.",
  },
  {
    number: "02",
    name: "Kitchen & Bath",
    body: "High-impact remodels that transform the heart of the home. Modern finishes, on-schedule delivery, and clean handoffs.",
  },
  {
    number: "03",
    name: "Full Renovation",
    body: "End-to-end renovation for homeowners. We handle design coordination, permits, subs, and every detail.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-surface-dark px-5 py-16 md:px-12 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div data-anim="section-header" className="text-center">
          <p className="text-meta text-accent">WHAT WE DO</p>
          <h2 className="text-display-l mt-4 text-background">
            Three ways we work.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.number} data-anim="service-card">
              <p
                data-anim="service-number"
                className="font-display text-[48px] font-bold text-accent"
              >
                {service.number}
              </p>
              <h3 className="text-display-m mt-6 text-background">
                {service.name}
              </h3>
              <p className="text-body mt-4 text-background/70">{service.body}</p>
              <a
                href="#contact"
                className="mt-6 inline-block font-sans text-[14px] font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
              >
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
