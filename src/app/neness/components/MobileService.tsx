import MediaSlot from "./MediaSlot";

export default function MobileService() {
  return (
    <section className="relative bg-surface-light px-5 pb-10 pt-24 md:px-12 md:pb-4 md:pt-32">
      {/* Covers the hero's bottom sliver (where the source video's watermark
          sits) with this section's own background, instead of zooming/cropping
          the video itself. Desktop only — on mobile the video renders small
          enough that the watermark isn't legible, and the hero should run
          the same full-height as porsche.com's, not get shortened by this. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-[8vh] bg-surface-light md:-top-[8vh] md:block"
      />

      <div className="mx-auto flex max-w-[1280px] flex-col items-center">
        <h2
          data-anim="section-header"
          className="text-mobile-intro-heading text-center text-ink"
        >
          Meticulous care, wherever your automobile is.
        </h2>

        <p className="mx-auto mt-5 max-w-[300px] text-center font-sans text-[15px] leading-[1.45] text-ink-muted md:mt-4 md:max-w-none md:whitespace-nowrap md:text-[18px] md:leading-[1.5]">
          We bring our expertise, equipment and attention to detail
          directly to your home, office or private collection.
        </p>

        <div
          data-anim="service-photo"
          className="relative mt-6 h-[calc((100vw-40px)*8/21+2cm)] w-full max-w-[960px] overflow-hidden rounded-[2rem] md:mt-8 md:aspect-[21/8] md:h-auto"
        >
          <MediaSlot
            src="/neness/porsche-garage-hq.png"
            alt="A classic Porsche prepared for mobile car detailing at a private garage in San Diego"
            label="Private garage — wide context shot"
            sizes="(min-width: 960px) 960px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
