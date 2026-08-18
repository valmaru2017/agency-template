import { Phone } from "lucide-react";
import ShieldMark from "./ShieldMark";
import ContactForm from "./ContactForm";

const SERVICES = ["Maintenance", "Signature", "Stewardship"];
const PHONE = "858-224-2312";
const PHONE_HREF = "tel:+18582242312";
const BOOKING_HREF =
  "https://book.squareup.com/appointments/tukvgrsqkgp0mb/location/LFWNM1A2FV7J6/services";

export default function Footer() {
  return (
    <>
      {/* Final CTA — its own moment, lighter/"elevated" black than the
          footer below so it reads as a distinct closing chapter, not part
          of the footer. */}
      <section
        id="contact"
        className="bg-white px-5 pb-28 pt-14 md:px-12 md:pb-36 md:pt-16"
      >
        <div className="content-shell grid grid-cols-1 gap-14 md:grid-cols-[45fr_55fr] md:items-center md:gap-12">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-statement-wrap w-full text-center text-ink md:text-left">
              Ready to preserve what matters.
            </h2>
            <p className="text-body-l mt-4 max-w-[46ch] text-ink-muted">
              Your automobile deserves more than a detail.
            </p>
            {/* Desktop: Book Now is primary (scrolls to the form below),
                Call Now stays visible as a secondary, outline option. */}
            <div className="mt-10 hidden items-center gap-3 md:flex">
              <a
                href={BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-sans text-[16px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Book Now
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 font-sans text-[16px] font-medium text-ink transition-colors hover:border-ink/50"
              >
                <Phone size={16} aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Mobile: Book Now is primary (scrolls to the form below),
                Call Now stays visible as a secondary, outline option. */}
            <div className="mt-8 flex w-full flex-col gap-3 md:hidden">
              <a
                href={BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-sans text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Book Now
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-sans text-[15px] font-medium text-ink transition-colors hover:border-ink/50"
              >
                <Phone size={16} aria-hidden="true" />
                Call Now
              </a>
            </div>
          </div>

          <div
            id="appointment-form"
            className="min-w-0 scroll-mt-24 rounded-3xl border border-ink/10 bg-white p-6 md:p-10"
          >
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer — same black palette, but the darker/quieter token, with a
          hairline dividing it from the CTA above. */}
      <footer className="border-t border-foreground/10 bg-background text-foreground">
        <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-16 md:px-12 md:pt-[100px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3 text-foreground">
                <ShieldMark className="h-8 w-auto" />
              </div>
              <p className="text-body mt-4 text-muted">
                Automotive preservation specialist.
              </p>
              <p className="text-body mt-4 text-muted">
                Prices shown apply to San Diego County. Additional travel
                fees may apply to appointments in Orange County and Los
                Angeles County.
              </p>
            </div>

            <div>
              <p className="text-meta text-muted">CONTACT</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={PHONE_HREF}
                  className="text-body text-muted transition-opacity hover:opacity-70"
                >
                  {PHONE}
                </a>
                <a
                  href="mailto:alberto@neness.com"
                  className="text-body text-muted transition-opacity hover:opacity-70"
                >
                  alberto@neness.com
                </a>
                <span className="text-body text-muted">
                  Serving Southern California
                </span>
              </div>
            </div>

            <div>
              <p className="text-meta text-muted">SERVICES</p>
              <div className="mt-4 flex flex-col gap-2">
                {SERVICES.map((service) => (
                  <span key={service} className="text-body text-muted">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-foreground/10 pt-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span className="font-sans text-[12px] text-muted">
                © 2026 Neness. San Diego, CA.
              </span>
              <span className="font-sans text-[12px] text-muted">
                Site by Growly
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
