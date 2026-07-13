import Image from "next/image";

const SERVICES = [
  "Fix & Flip",
  "Kitchen & Bath",
  "Full Renovation",
  "Free Estimates",
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-background">
      <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-16 md:px-12 md:pt-[100px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/rhino/logo-rhino.png"
              alt="Rhino Construction"
              width={649}
              height={204}
              className="h-[46px] w-auto"
              style={{ filter: "invert(1)" }}
            />
            <p className="text-body mt-4 text-background/70">
              Fix &amp; flip contractors. Houston, TX.
            </p>
          </div>

          <div>
            <p className="text-meta text-background/70">CONTACT</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="tel:+17135550142"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                (713) 555-0142
              </a>
              <a
                href="mailto:info@rhinoconstruction.com"
                className="text-body text-background/70 transition-opacity hover:opacity-70"
              >
                info@rhinoconstruction.com
              </a>
              <span className="text-body text-background/70">
                Houston, Texas
              </span>
            </div>
          </div>

          <div>
            <p className="text-meta text-background/70">SERVICES</p>
            <div className="mt-4 flex flex-col gap-2">
              {SERVICES.map((service) => (
                <span key={service} className="text-body text-background/70">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-background/10 pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span className="font-sans text-[12px] text-background/60">
              © 2026 Rhino Construction. Licensed in Texas.
            </span>
            <span className="font-sans text-[12px] text-background/60">
              Site by Growly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
