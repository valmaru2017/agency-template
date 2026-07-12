import Image from "next/image";

const IMAGES = [
  {
    src: "/delfos/gallery-1.jpg",
    alt: "Hands resting in a warm therapeutic touch",
    ratio: "4 / 5",
    offset: false,
  },
  {
    src: "/delfos/gallery-2.jpg",
    alt: "Amber glass oil bottle with candlelight",
    ratio: "1 / 1",
    offset: true,
  },
  {
    src: "/delfos/gallery-3.jpg",
    alt: "Dried flowers in golden evening light",
    ratio: "3 / 4",
    offset: false,
  },
  {
    src: "/delfos/gallery-4.jpg",
    alt: "Folded linen towels on a wooden stool",
    ratio: "1 / 1",
    offset: true,
  },
];

export default function GalleryMosaic() {
  return (
    <section id="gallery" className="delfos-section bg-background">
      <div className="mx-auto max-w-[1440px] px-5 md:px-14">
        <div data-anim="section-header">
          <p className="text-meta text-accent">GALLERY</p>
          <h2 className="text-display-l mt-4 text-foreground">
            Small details, held with care.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {IMAGES.map((image) => (
            <figure
              key={image.src}
              data-anim="project-card"
              className={`relative overflow-hidden ${
                image.offset ? "md:mt-12" : ""
              }`}
              style={{ aspectRatio: image.ratio }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 24vw, 46vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
