import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      <div data-anim="hero-photo" className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Fachada de propiedad moderna en Bogotá, arquitectura contemporánea con luz cálida"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(8,10,13,0.55) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,10,13,0.35) 0%, transparent 15%)",
        }}
      />

      <div className="absolute bottom-6 left-5 right-5 md:bottom-16 md:left-16 md:right-16">
        <p data-anim="hero-meta" className="text-meta text-background">
          EST. 2007 · BOGOTÁ
        </p>

        <h1 className="text-display-xl mt-4 text-background">
          <span className="block overflow-hidden">
            <span data-anim="headline-line" className="inline-block">
              Propiedades curadas
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-anim="headline-line" className="inline-block">
              en Bogotá.
            </span>
          </span>
        </h1>
      </div>

      <p
        data-anim="hero-meta"
        className="text-meta absolute bottom-6 right-5 text-background md:bottom-16 md:right-16"
      >
        SELECCIÓN 2026
      </p>
    </section>
  );
}
