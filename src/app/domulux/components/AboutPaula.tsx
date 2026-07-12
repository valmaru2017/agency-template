import Image from "next/image";

export default function AboutPaula() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-16 md:py-[120px]">
      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        <div className="md:w-5/12">
          <div
            data-anim="paula-photo"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]"
          >
            <Image
              src="/images/paula.jpeg"
              alt="Retrato de Paula Ramírez, directora de Domulux"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:w-7/12">
          <p data-anim="paula-line" className="text-meta text-muted">
            DIRECCIÓN
          </p>
          <h2 data-anim="paula-line" className="text-display-l mt-8 text-foreground">
            Paula Ramírez
          </h2>
          <p className="text-meta mt-4 text-muted" data-anim="paula-line">
            DIRECTORA · CORREDORA INMOBILIARIA CERTIFICADA
          </p>
          <p
            data-anim="paula-line"
            className="text-body mt-8 text-foreground"
            style={{ maxWidth: "45ch" }}
          >
            Con 18 años en el corretaje inmobiliario de Bogotá, Paula ha
            acompañado a más de 900 familias en la compra, venta y
            arrendamiento de sus propiedades. Domulux nace de esa filosofía:
            cercanía real y conocimiento profundo del mercado.
          </p>
          <a
            data-anim="paula-line"
            href="https://wa.me/573142934466"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-fit font-sans text-[15px] font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            Escribir por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
