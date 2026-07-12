const STEPS = [
  {
    number: "01",
    title: "Arrive early",
    body: "Come 20 minutes before your ritual to change, settle, and enjoy the relaxation area with warm tea.",
  },
  {
    number: "02",
    title: "Speak with your therapist",
    body: "A short conversation before each ritual lets us adjust pressure, focus, and pace to what your body needs that day.",
  },
  {
    number: "03",
    title: "Leave unhurried",
    body: "Your room stays yours for a few extra minutes after treatment. There is no rush back into the day.",
  },
];

export default function WhatToExpect() {
  return (
    <section id="expect" className="delfos-section bg-surface-warm">
      <div className="mx-auto max-w-[1440px] px-5 md:px-14">
        <div data-anim="section-header" className="max-w-[560px]">
          <p className="text-meta text-accent">WHAT TO EXPECT</p>
          <h2 className="text-display-l mt-4 text-foreground">
            Your visit, at a slower pace.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <article
              key={step.number}
              data-anim="about-line"
              className="border-t border-foreground/15 pt-6"
            >
              <span className="font-display text-[40px] text-accent">
                {step.number}
              </span>
              <h3 className="text-display-m mt-4 text-foreground">
                {step.title}
              </h3>
              <p className="text-body mt-3 text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
