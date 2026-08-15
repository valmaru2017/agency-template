import MediaSlot from "./MediaSlot";

type ServiceGroup = { label: string | null; items: string[] };

const SERVICES: {
  id: string;
  name: string;
  price: string | null;
  tagline: string;
  description?: string;
  image: string;
  imageAlt: string;
  imgClassName?: string;
  groups: ServiceGroup[];
  time: string;
}[] = [
  {
    id: "maintenance",
    name: "Maintenance",
    price: "$275",
    tagline: "Refine & Maintain",
    description:
      "A meticulous interior and exterior wash for vintage and luxury automobiles, finished with premium protection designed to preserve your vehicle's appearance and keep it looking its best.",
    image: "/neness/concours-detail.jpg",
    imageAlt:
      "A vintage automobile's dashboard and steering wheel after mobile maintenance detailing in San Diego",
    groups: [],
    time: "3 hours",
  },
  {
    id: "signature",
    name: "Signature",
    price: "$595",
    tagline: "Restore & Protect",
    description:
      "A comprehensive interior and exterior rejuvenation for vintage and luxury automobiles, including paint decontamination, machine polishing, paint correction, and protective finishing.",
    image: "/neness/signature-ferrari-f40.jpg",
    imageAlt:
      "A glossy exotic sports car after mobile paint correction and signature detailing in San Diego",
    imgClassName: "object-cover scale-110",
    groups: [],
    time: "6 hours",
  },
  {
    id: "concours",
    name: "Stewardship",
    price: null,
    tagline: "Preserve & Maintain",
    description:
      "A highly exclusive service reserved for nine private collections, each entrusted to the care of a dedicated professional guardian. By consultation.",
    image: "/neness/collection.jpg",
    imageAlt: "A private collection of vintage and luxury automobiles under Neness stewardship care",
    groups: [],
    time: "By consultation",
  },
];

function IncludesList({ groups }: { groups: (typeof SERVICES)[number]["groups"] }) {
  const items = groups.flatMap((group) => group.items);

  return (
    <div className="mt-2 flex flex-col items-start">
      <p className="text-meta text-foreground/70">What&apos;s included</p>
      <p className="mt-1 max-w-none text-left text-[13px] leading-tight text-foreground/85">
        {items.join(" · ")}
      </p>
    </div>
  );
}

export default function Services() {
  return (
    <div>
      {SERVICES.map((service, index) => {
        const flipped = index % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            className="bg-surface-light px-5 py-14 md:px-12 md:py-16"
          >
            <div
              className={`content-shell grid grid-cols-1 items-stretch gap-0 md:grid-cols-[1fr_1fr] ${
                flipped ? "md:[direction:rtl]" : ""
              }`}
            >
              <div
                data-anim="service-photo"
                className={`relative h-[300px] w-full overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] md:h-[366px] md:[direction:ltr] ${
                  flipped
                    ? "md:rounded-tl-none md:rounded-tr-[2rem] md:rounded-bl-none md:rounded-br-[2rem]"
                    : "md:rounded-tl-[2rem] md:rounded-tr-none md:rounded-bl-[2rem] md:rounded-br-none"
                }`}
              >
                <MediaSlot
                  src={service.image}
                  alt={service.imageAlt}
                  label={`${service.name} — detail shot`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  imgClassName={service.imgClassName ?? "object-cover"}
                />
              </div>

              <div
                className={`flex flex-col items-start justify-between overflow-hidden rounded-bl-[2rem] rounded-br-[2rem] bg-surface-graphite px-8 py-10 text-left md:h-[366px] md:px-12 md:py-8 md:[direction:ltr] ${
                  flipped
                    ? "md:rounded-tl-[2rem] md:rounded-tr-none md:rounded-bl-[2rem] md:rounded-br-none"
                    : "md:rounded-tl-none md:rounded-tr-[2rem] md:rounded-bl-none md:rounded-br-[2rem]"
                }`}
              >
                <div className="flex flex-col items-start md:w-full">
                  <div className="flex w-full flex-row items-center justify-between gap-4">
                    <h3 className="text-service-name text-foreground">
                      {service.name}
                    </h3>
                    {service.price ? (
                      <p className="shrink-0 translate-y-[4px] rounded-full border border-foreground/20 px-4 py-1.5 font-sans text-[15px] font-medium leading-none text-foreground md:translate-y-[4px] md:text-[19px]">{service.price}</p>
                    ) : null}
                  </div>
                  <p className="mt-4 font-sans text-[14px] font-medium leading-none text-foreground md:mt-3">
                    {service.tagline}
                  </p>
                  {service.description ? (
                    <p className="mt-8 max-w-[52ch] font-sans text-[15px] font-normal leading-[1.45] text-foreground/85 md:mt-10 md:text-[16px] md:leading-[1.5]">
                      {service.description}
                    </p>
                  ) : null}
                  <p
                    className={`text-meta text-foreground/70 ${
                      service.description ? "mt-8 md:mt-10" : "mt-4 md:mt-3"
                    }`}
                  >
                    {service.id === "concours"
                      ? service.time
                      : `Estimated time: ${service.time}`}
                  </p>

                  {service.groups.length > 0 ? (
                    <IncludesList groups={service.groups} />
                  ) : null}
                </div>

                {service.id !== "concours" ? (
                  <a
                    href="https://book.squareup.com/appointments/tukvgrsqkgp0mb/location/LFWNM1A2FV7J6/services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black px-6 py-3 font-sans font-medium text-white transition-opacity hover:opacity-90 ${
                      service.description
                        ? "mt-3 text-[15px] md:mt-2 md:text-[16px]"
                        : "mt-6 text-[18px] md:mt-5 md:text-[14px]"
                    }`}
                  >
                    Book Now
                    <span className="text-white transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
