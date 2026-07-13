"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { gsap } from "gsap";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "(713) 555-0142";
const PHONE_HREF = "tel:+17135550142";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlay,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );

    const getFocusable = () =>
      Array.from(
        overlay.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/[0.08] bg-background">
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-12">
        <Link href="#top" aria-label="Rhino Construction home" className="shrink-0">
          <Image
            src="/rhino/logo-rhino.png"
            alt="Rhino Construction"
            width={649}
            height={204}
            className="h-[30px] w-auto md:h-[37px]"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-[14px] font-medium text-foreground transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={PHONE_HREF}
              className="font-sans text-[14px] font-semibold text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              {PHONE}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-5 md:hidden">
          <a href={PHONE_HREF} aria-label={`Call ${PHONE}`} className="text-foreground">
            <Phone size={20} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="text-foreground"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] bg-background"
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-5 top-6 text-foreground"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={22} aria-hidden="true" />
          </button>

          <ul className="flex h-full flex-col items-start justify-center gap-6 px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-display-m text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={PHONE_HREF}
                onClick={() => setOpen(false)}
                className="text-display-m text-accent"
              >
                {PHONE}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
