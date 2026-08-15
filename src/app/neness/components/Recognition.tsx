import MediaSlot from "./MediaSlot";

const AWARDS = [
  {
    id: "ferrari-testarossa",
    label: "1988 Ferrari Testarossa",
    title: "La Jolla Concours d'Elegance",
    subtitle: null,
    meta: null,
    image: "/neness/premio1.jpg",
    imgClassName: "object-cover object-[50%_60%]",
  },
  {
    id: "maserati-2000cc",
    label: "1951 Maserati 2000",
    title: "Amelia Island Concours d'Elegance",
    subtitle: null,
    meta: null,
    image: "/neness/premio3.jpg",
    imgClassName: "object-cover object-[35%_50%]",
  },
];

export default function Recognition() {
  return (
    <section id="recognition" className="bg-surface-light px-5 pb-20 pt-16 text-ink md:px-12 md:pb-24 md:pt-20">
      <div className="content-shell">
        <div>
          <h2 className="text-statement-wrap text-center text-ink md:text-left">
            The work speaks for itself.
          </h2>
          <p className="text-body-l mt-4 text-ink-muted md:whitespace-nowrap">
            Every award represents countless hours of meticulous preparation,
            and a shared passion for excellence.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[940px] grid-cols-1 items-stretch gap-6 md:mt-16 md:max-w-none md:grid-cols-2 md:gap-8">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              className="grid grid-cols-1 items-stretch overflow-hidden rounded-[2rem] md:grid-cols-2 md:h-[210px]"
            >
              <div
                data-anim="service-photo"
                className="relative aspect-[5/4] w-full overflow-hidden md:aspect-auto md:h-full"
              >
                <MediaSlot
                  src={award.image}
                  alt={`${award.label} — ${award.title}`}
                  label={`${award.label} — award photo`}
                  sizes="(min-width: 768px) 25vw, 100vw"
                  imgClassName={award.imgClassName}
                />
              </div>

              <div className="flex flex-col items-start justify-center bg-near-black px-6 py-8 text-foreground md:px-8">
                <p className="text-meta text-foreground/70">{award.label}</p>
                <p className="mt-2 font-display text-[18px] font-semibold leading-[1.25] text-foreground md:text-[clamp(22px,2vw,28px)]">{award.title}</p>
                {award.subtitle ? (
                  <p className="text-body-l mt-1 italic text-foreground/80">
                    {award.subtitle}
                  </p>
                ) : null}
                {award.meta ? (
                  <p className="text-meta mt-3 text-muted">{award.meta}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
