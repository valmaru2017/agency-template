import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-background">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div>
            <div className="relative h-8 w-[120px]">
              <Image
                src="/images/Logo-actualizado.png"
                alt="Domulux"
                fill
                sizes="120px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-body mt-5 text-background/70">
              Corretaje inmobiliario boutique. Bogotá.
            </p>
          </div>

          <div>
            <p className="text-meta text-background/70">CONTACTO</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="mailto:info@domulux.com"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                info@domulux.com
              </a>
              <a
                href="https://wa.me/573142934466"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                +57 314 293 4466
              </a>
              <span className="text-body text-background/70">Bogotá, Colombia</span>
            </div>
          </div>

          <div>
            <p className="text-meta text-background/70">REDES</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://instagram.com/domulux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/573142934466"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-background/10 pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span className="font-sans text-[12px] text-background/60">
              © 2026 Domulux. Todos los derechos reservados.
            </span>
            <span className="font-sans text-[12px] text-background/60">
              Sitio diseñado por Growly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
