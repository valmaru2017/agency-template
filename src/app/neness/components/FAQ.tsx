// Answer-first copy on purpose: both search engines and AI answer engines
// (ChatGPT, Claude, Perplexity) favor pulling a direct first sentence over
// having to parse marketing language for the actual answer. The JSON-LD
// below is generated from this same array, so the visible page and the
// structured data can never drift out of sync.
const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is car preservation?",
    answer:
      "Car preservation is ongoing, protective care for a vehicle's paint, interior, and mechanical condition — as opposed to a one-time detail. Instead of just cleaning a car, Neness maintains its condition and value over time through regular maintenance washes, periodic paint correction, and long-term stewardship for private collections.",
  },
  {
    question: "What's the difference between Maintenance and Signature Preservation?",
    answer:
      "Maintenance Preservation is a routine interior and exterior wash with premium protection, taking about 3 hours and starting at $275. Signature Preservation is a deeper service that adds paint decontamination, machine polishing, and paint correction, taking about 6 hours and starting at $595 — it's built for cars that need their paint actively restored, not just maintained.",
  },
  {
    question: "Is the detailing service mobile, or do I have to drop off my car?",
    answer:
      "Neness is fully mobile — every service is performed at your home, office, or private collection, so there's no drop-off. You book an appointment and the detailing happens wherever your car already is.",
  },
  {
    question: "What areas does Neness serve?",
    answer:
      "Neness serves San Diego County, California, providing mobile car preservation and detailing anywhere in that service area.",
  },
  {
    question: "What is Stewardship?",
    answer:
      "Stewardship is Neness's ongoing care program for private vehicle collections, limited to nine collections at a time. Each is entrusted to a dedicated professional guardian for continuous upkeep rather than a single appointment, and it's available by consultation only.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-surface-light px-5 py-20 text-ink md:px-12 md:py-24"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <div className="content-shell">
        <h2 className="text-statement-wrap text-ink">
          Frequently asked questions
        </h2>

        <div className="mt-12 flex flex-col md:mt-16">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              className={`max-w-[68ch] py-7 md:py-8 ${
                index === 0 ? "border-t border-ink/12" : ""
              } border-b border-ink/12`}
            >
              <h3 className="text-display-m text-ink">{item.question}</h3>
              <p className="text-body-l mt-3 text-ink-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
