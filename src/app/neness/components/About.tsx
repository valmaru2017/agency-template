export default function About() {
  return (
    <section
      id="about"
      className="relative bg-surface-graphite px-5 pb-16 pt-16 md:px-12 md:pb-20 md:pt-20"
    >
      <div className="content-shell flex flex-col items-center text-left md:items-center">
        <div className="flex w-full max-w-[640px] flex-col items-start">
          <h2
            data-anim="section-header"
            className="text-statement-wrap mt-4 w-full max-w-none text-left text-foreground"
          >
            About us
          </h2>

          <p className="text-body-l mt-6 w-full text-foreground/80">
            With a passion for automotive craftsmanship and preservation,
            Neness was founded to offer discerning owners a more thoughtful
            and personal approach to caring for exceptional automobiles.
          </p>
          <p className="text-body-l mt-4 w-full text-foreground/80">
            Whether a modern exotic or a vintage European automobile, every
            vehicle is treated individually, with careful attention to its
            materials, finish, history, and how it is meant to be enjoyed.
          </p>
          <p className="text-body-l mt-4 w-full text-foreground/80">
            For us, it is not simply about making a car look beautiful.
            It is about caring for it properly, preserving its character,
            and giving every detail the attention it deserves.
          </p>
        </div>
      </div>
    </section>
  );
}
