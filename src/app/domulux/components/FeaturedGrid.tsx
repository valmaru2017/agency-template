import Image from "next/image";
import Link from "next/link";

const PROPERTIES = [
  {
    photo: "/images/properties/property-1.jpg",
    name: "Apartamento en Chicó",
    meta: "CHAPINERO · 3 HAB · 120 M²",
    price: "$1,850,000,000 COP",
  },
  {
    photo: "/images/properties/property-2.jpg",
    name: "Casa en Chapinero Alto",
    meta: "CHAPINERO ALTO · 4 HAB · 320 M²",
    price: "$4,200,000,000 COP",
  },
  {
    photo: "/images/properties/property-3.jpg",
    name: "Penthouse Rosales",
    meta: "ROSALES · 3 HAB · 240 M²",
    price: "$3,600,000,000 COP",
  },
  {
    photo: "/images/properties/property-4.jpg",
    name: "Apartaestudio Zona G",
    meta: "CHAPINERO · 1 HAB · 55 M²",
    price: "$620,000,000 COP",
  },
  {
    photo: "/images/properties/property-5.jpg",
    name: "Casa en Santa Bárbara",
    meta: "USAQUÉN · 5 HAB · 480 M²",
    price: "$5,800,000,000 COP",
  },
  {
    photo: "/images/properties/property-6.jpg",
    name: "Apartamento Chicó Navarra",
    meta: "CHICÓ · 2 HAB · 95 M²",
    price: "$1,200,000,000 COP",
  },
];

export default function FeaturedGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-[120px] md:px-16">
      <div
        data-anim="section-header"
        className="flex items-center justify-between"
      >
        <h2 className="text-meta text-muted">SELECCIÓN ACTUAL</h2>
        <Link
          href="/domulux/compra"
          className="font-sans text-[13px] text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          Ver todas →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3 md:gap-y-20">
        {PROPERTIES.map((property) => (
          <article key={property.name} data-anim="property-card" className="group">
            <figure>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[2px]">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={property.photo}
                    alt={`${property.name} — fotografía de la propiedad`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <figcaption className="mt-6">
                <h3 className="text-display-m text-foreground">{property.name}</h3>
                <p className="text-meta mt-2 text-muted">{property.meta}</p>
                <p className="mt-3 font-sans text-[16px] font-medium text-foreground">
                  {property.price}
                </p>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
