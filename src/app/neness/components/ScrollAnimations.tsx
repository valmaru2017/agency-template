"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

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

      const tiles = gsap.utils.toArray<HTMLElement>("[data-anim='tile']");
      if (tiles.length) {
        ScrollTrigger.batch(tiles, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
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

      gsap.utils
        .toArray<HTMLElement>("[data-anim='service-number']")
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

      gsap.utils
        .toArray<HTMLElement>("[data-anim='service-photo']")
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

      gsap.utils
        .toArray<HTMLElement>("[data-anim='section-header']")
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

    return () => {
      ctx.revert();
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
