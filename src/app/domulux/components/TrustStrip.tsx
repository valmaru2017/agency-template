const ITEMS = [
  { value: 18, label: "años acompañando compradores en Bogotá" },
  { value: 942, label: "clientes atendidos desde 2007" },
  { value: 576, label: "propiedades transadas" },
];

export default function TrustStrip() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-16">
      <h2 className="sr-only">Confianza</h2>
      <div className="grid w-full grid-cols-1 divide-y divide-foreground/[0.12] md:grid-cols-3 md:divide-x md:divide-y-0">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            data-anim="trust-item"
            className="flex flex-col items-center gap-3 px-0 py-10 text-center md:px-10 md:py-0"
          >
            <span
              data-anim="trust-number"
              data-value={item.value}
              className="text-display-l text-foreground"
            >
              0
            </span>
            <p className="text-meta max-w-[24ch] text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
