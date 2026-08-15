const TESTIMONIALS = [
  {
    quote:
      "Excellent service from start to finish. Incredible attention to detail, professionalism, and care for my car. The results were fantastic—I highly recommend it and will definitely use them again!",
    name: "Sam Parsons",
    car: "1971 Alfa Romeo Giulia 1600 Super",
  },
  {
    quote:
      "Outstanding service and attention to detail. My car looks incredible! Professional, careful, and clearly passionate about the work. Highly recommended!",
    name: "Daniela Felix",
    car: "2023 Porsche GT4 RS",
  },
  {
    quote:
      "I trust him completely with my collection. His attention to detail, professionalism, and care for every vehicle are second to none. Knowing my cars are in good hands gives me complete peace of mind.",
    name: "David Wilson",
    car: "1982 Ferrari 512 BB",
  },
];

export default function Testimonials() {
  return (
    <section
      className="px-5 py-20 text-foreground md:px-12 md:py-24"
      style={{ background: "#111110" }}
    >
      <div className="content-shell">
        <h2 className="text-statement-wrap text-center text-foreground md:text-left">
          What our clients say about us
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-full flex-col rounded-[2rem] border-[0.5px] border-white/15 p-6 md:p-7"
              style={{ background: "#1a1a19" }}
            >
              <p className="text-body-l text-foreground/85">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto pt-4 text-center">
                <p className="text-meta text-foreground/60">
                  {testimonial.name}
                </p>
                <p className="text-meta mt-1 text-foreground/40">
                  {testimonial.car}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
