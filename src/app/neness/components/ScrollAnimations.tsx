"use client";

import { useEffect, useRef } from "react";

export default function ScrollAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // GSAP + ScrollTrigger + Lenis loaded as dynamic imports (instead of
    // static top-of-file imports) so they ship as their own chunk, fetched
    // and executed after the page's own JS has hydrated, rather than
    // sitting on the critical path that Total Blocking Time measures.
    // Same animations, just not blocking initial load.
    let cancelled = false;
    let teardown: (() => void) | undefined;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]: any[]) => {
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.default;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Lenis still drives anchor scrolling (nav → #services, tiles → #detailing,
      // etc.) even when motion is reduced — only the decorative tweens below skip.
      const lenis = new Lenis();
      const onLenisScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onLenisScroll);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(
            "[data-anim='hero-meta'], [data-anim='headline-line'], [data-anim='tile'], [data-anim='service-number'], [data-anim='service-photo'], [data-anim='section-header']",
            { opacity: 1, y: 0, yPercent: 0, scale: 1 }
          );
          return;
        }

        const heroSection = root.querySelector<HTMLElement>("#top");
        const heroMedia = root.querySelector<HTMLElement>(
          "[data-anim='hero-media']"
        );
        const heroDarken = root.querySelector<HTMLElement>(
          "[data-anim='hero-darken']"
        );

        if (heroSection && heroMedia) {
          gsap.fromTo(
            heroMedia,
            { yPercent: -2 },
            {
              yPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (heroSection && heroDarken) {
          gsap.fromTo(
            heroDarken,
            { opacity: 0 },
            {
              opacity: 0.4,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        const heroMeta = root.querySelectorAll<HTMLElement>(
          "[data-anim='hero-meta']"
        );
        const headlineLines = root.querySelectorAll<HTMLElement>(
          "[data-anim='headline-line']"
        );

        const heroTl = gsap.timeline();

        if (heroMeta.length) {
          heroTl.fromTo(
            heroMeta,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0
          );
        }

        if (headlineLines.length) {
          heroTl.fromTo(
            headlineLines,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power4.out",
              stagger: 0.1,
            },
            0.15
          );
        }

        const tiles = gsap.utils.toArray("[data-anim='tile']") as HTMLElement[];
        if (tiles.length) {
          ScrollTrigger.batch(tiles, {
            start: "top 90%",
            once: true,
            onEnter: (batch: HTMLElement[]) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: 28 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.1,
                }
              ),
          });
        }

        (gsap.utils.toArray("[data-anim='service-number']") as HTMLElement[])
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 88%" },
              }
            );
          });

        (gsap.utils.toArray("[data-anim='service-photo']") as HTMLElement[])
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, scale: 1.03 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%" },
              }
            );
          });

        (gsap.utils.toArray("[data-anim='section-header']") as HTMLElement[])
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" },
              }
            );
          });
      }, root);

      teardown = () => {
        ctx.revert();
        lenis.off("scroll", onLenisScroll);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
