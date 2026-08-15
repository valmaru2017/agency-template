"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { gsap } from "gsap";
import ShieldMark from "./ShieldMark";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const MOBILE_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "858-224-2312";
const PHONE_HREF = "tel:+18582242312";
const BOOKING_HREF =
  "https://book.squareup.com/appointments/tukvgrsqkgp0mb/location/LFWNM1A2FV7J6/services";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      { y: -16 },
      { y: 0, duration: 0.5, ease: "power3.out" }
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
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-foreground/10 bg-background/90 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      {!scrolled && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
          aria-hidden="true"
        />
      )}

      <nav className="relative mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-[28px] md:px-[1cm]">
        <Link
          href="#top"
          aria-label="Neness home"
          className="flex shrink-0 items-center gap-3 text-foreground"
        >
          <ShieldMark className="h-8 w-auto" />
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
            <Link
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2 font-sans text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              Book now
              <ArrowRight
                size={14}
                className="text-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden="true"
              />
            </Link>
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
    </header>

    {open && (
      <div
        ref={overlayRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <div className="flex items-center justify-between px-8 pt-6">
          <Link
            href="#top"
            aria-label="Neness home"
            onClick={() => setOpen(false)}
            className="flex items-center text-foreground"
          >
            <ShieldMark className="h-8 w-auto" />
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            className="text-foreground/70 transition-colors hover:text-foreground"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-start justify-start gap-10 px-8 pt-20">
          <nav className="flex flex-col gap-3">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-nav-mobile inline-block text-foreground transition-colors hover:text-foreground/60 active:text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex h-[54px] items-center justify-center rounded-xl bg-foreground px-8 font-sans text-[16px] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Book Now
            </a>
            <a
              href={PHONE_HREF}
              onClick={() => setOpen(false)}
              aria-label={`Call ${PHONE}`}
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl border border-foreground/25 text-foreground transition-colors hover:border-foreground/50 hover:text-accent"
            >
              <Phone size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
