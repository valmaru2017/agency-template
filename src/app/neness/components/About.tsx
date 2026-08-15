import MediaSlot from "./MediaSlot";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-surface-graphite px-5 pb-[calc(3rem+2cm)] pt-20 md:px-12 md:pb-[calc(3.5rem+2cm)] md:pt-24"
    >
      <div className="content-shell grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_43%] md:items-stretch md:gap-x-[2cm]">
        <div className="order-2 flex flex-col items-start justify-center text-left md:order-1">
          <h2
            data-anim="section-header"
            className="text-service-name mt-4 w-full max-w-none text-left text-foreground"
          >
            Hands behind the work
          </h2>

          <div className="mt-6 w-full border-y border-foreground/15 py-3">
            <p className="text-meta text-foreground/70">
              Alberto Bracamontes — San Diego, California
            </p>
          </div>

          <p className="text-body-l mt-6 w-full text-foreground/80">
            With a passion for automotive craftsmanship and preservation, I
            founded Neness to offer discerning owners a more thoughtful and
            personal approach to caring for exceptional automobiles.
          </p>
          <p className="text-body-l mt-4 w-full text-foreground/80">
            Whether it&rsquo;s a modern exotic or a vintage European
            automobile, I treat every vehicle individually with careful
            attention to its materials, finish, history, and how it is meant
            to be enjoyed.
          </p>
          <p className="text-body-l mt-4 w-full text-foreground/80">
            For me, it&rsquo;s not simply about making a car look beautiful.
            It&rsquo;s about caring for it properly, preserving its
            character, and giving every detail the attention it deserves.
          </p>
        </div>

        <div
          data-anim="service-photo"
          className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[2rem] md:order-2 md:aspect-auto md:h-full"
        >
          <MediaSlot
            src="/neness/about-founder-1.jpg"
            alt="Alberto Bracamontes, founder of Neness, beside a preserved vintage automobile in San Diego"
            label="About Neness — founder or workshop photo"
            sizes="(min-width: 768px) 43vw, 100vw"
            imgClassName="object-cover [filter:contrast(1.08)_brightness(0.92)_saturate(0.85)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
