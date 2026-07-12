"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const LINKS = [
  { label: "Rituals", href: "#rituals" },
  { label: "The Space", href: "#the-space" },
  { label: "Gallery", href: "#gallery" },
  { label: "What To Expect", href: "#expect" },
  { label: "Contact", href: "#book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const invert = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-background border-b border-foreground/[0.08]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-14">
        <Link href="#top" aria-label="Delfos home" className="shrink-0">
          <Image
            src="/delfos/logo-delfos.png"
            alt="Delfos"
            width={240}
            height={53}
            className="h-[26px] w-auto md:h-8"
            style={{ filter: invert ? "brightness(0) invert(1)" : "none" }}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-meta transition-opacity hover:opacity-60 ${
                  invert ? "text-background" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="#book"
            className="bg-accent px-6 py-3 font-sans text-[13px] font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Book a Ritual
          </Link>
        </div>

        <button
          type="button"
          className={invert ? "text-background md:hidden" : "text-foreground md:hidden"}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
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
              <Link
                href="#book"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block bg-accent px-6 py-3 font-sans text-[14px] font-medium text-background"
              >
                Book a Ritual
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
