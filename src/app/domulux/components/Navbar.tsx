"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import clsx from "clsx";

const LINKS = [
  { label: "Compra", href: "/domulux/compra" },
  { label: "Renta", href: "/domulux/renta" },
  { label: "Publicar", href: "/domulux/publicar" },
  { label: "Nosotros", href: "/domulux/nosotros" },
  { label: "Contacto", href: "/domulux/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b",
        scrolled
          ? "bg-background border-foreground/[0.08] shadow-[0_14px_43px_-7px_rgba(8,10,13,0.31)]"
          : "bg-transparent border-transparent shadow-none"
      )}
      style={{
        transition:
          "background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
      }}
    >
      <nav className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-16">
        <Link
          href="/domulux"
          className="relative block h-[69px] w-[104px] shrink-0 md:h-[78px] md:w-[118px]"
        >
          <Image
            src="/images/Logo-actualizado.png"
            alt="Domulux"
            fill
            className="object-contain object-left transition-[filter] duration-300 ease"
            style={{ filter: scrolled ? "invert(1)" : "none" }}
            priority
            sizes="118px"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  "group relative inline-block font-sans text-[13px] transition-colors duration-300 ease",
                  scrolled ? "text-foreground" : "text-background"
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={clsx(
                    "pointer-events-none absolute left-0 top-full mt-1 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100",
                    scrolled ? "bg-foreground" : "bg-background"
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={clsx(
            "transition-colors duration-300 ease md:hidden",
            scrolled ? "text-foreground" : "text-background"
          )}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú del sitio"
          className="fixed inset-0 z-[60] bg-background"
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-5 top-6 text-foreground md:right-16"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>

          <ul className="flex h-full flex-col items-start justify-center gap-6 px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-display-m group relative inline-block text-foreground"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-full mt-1 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
