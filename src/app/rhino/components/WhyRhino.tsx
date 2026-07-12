import Image from "next/image";

const BULLETS = [
  "Fixed-price contracts with no surprise charges",
  "Weekly progress updates and photo reports",
  "1-year warranty on all work",
];

export default function WhyRhino() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-[100px]"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div
            data-anim="team-photo"
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src="/rhino/team.jpg"
              alt="Rhino Construction crew on a Houston job site"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-7">
          <p data-anim="about-line" className="text-meta text-muted">
            WHY RHINO
          </p>
          <h2 data-anim="about-line" className="text-display-l mt-4 text-foreground">
            Contractors who show up. Every time.
          </h2>
          <p
            data-anim="about-line"
            className="text-body-l mt-8 max-w-[50ch] text-foreground"
          >
            We know renovation is stressful. Missed deadlines, blown budgets,
            no-show subs. Rhino was built to be the opposite. Clear
            communication, sharp estimates, and crews that deliver.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {BULLETS.map((bullet) => (
              <li
                key={bullet}
                data-anim="about-line"
                className="font-sans text-[14px] font-medium text-foreground"
              >
                <span className="text-accent">–</span> {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
