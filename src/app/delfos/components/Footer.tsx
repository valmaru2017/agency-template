import Image from "next/image";

const RITUALS = ["The Deep Warmth", "Volcanic Stone", "The Renewal Facial"];
const EXPLORE = ["Rituals", "The Space", "Gallery", "What To Expect"];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 md:px-14 md:pt-[100px]">
        <div className="grid grid-cols-1 gap-12 border-t border-foreground/10 pt-14 md:grid-cols-4">
          <div>
            <Image
              src="/delfos/logo-delfos.png"
              alt="Delfos"
              width={240}
              height={53}
              className="h-10 w-auto"
            />
            <p className="text-body mt-5 max-w-[30ch] text-muted">
              A quiet space for the body, in the heart of the city.
            </p>
          </div>

          <div>
            <p className="text-meta text-muted">RITUALS</p>
            <div className="mt-4 flex flex-col gap-2">
              {RITUALS.map((ritual) => (
                <span key={ritual} className="text-body text-muted">
                  {ritual}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-meta text-muted">EXPLORE</p>
            <div className="mt-4 flex flex-col gap-2">
              {EXPLORE.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-body text-muted transition-opacity hover:opacity-70"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-meta text-muted">VISIT</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="tel:+12125550148"
                className="text-body text-muted transition-opacity hover:opacity-70"
              >
                (212) 555-0148
              </a>
              <a
                href="mailto:hello@delfosspa.com"
                className="text-body text-muted transition-opacity hover:opacity-70"
              >
                hello@delfosspa.com
              </a>
              <span className="text-body text-muted">
                18 Linden Street, New York
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-foreground/10 pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span className="font-sans text-[12px] text-muted">
              &copy; 2026 Delfos Spa. All rights reserved.
            </span>
            <span className="font-sans text-[12px] text-muted">
              Site by Growly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
