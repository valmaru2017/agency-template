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

    const lenis = new Lenis();
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const heroPhoto = root.querySelector<HTMLElement>(
        "[data-anim='hero-photo']"
      );
      const headlineLines = root.querySelectorAll<HTMLElement>(
        "[data-anim='headline-line']"
      );
      const heroMeta = root.querySelectorAll<HTMLElement>(
        "[data-anim='hero-meta']"
      );

      const heroTl = gsap.timeline();

      if (heroPhoto) {
        heroTl.fromTo(
          heroPhoto,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
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
            duration: 0.68,
            ease: "power4.out",
            stagger: 0.12,
          },
          0.1
        );
      }

      if (heroMeta.length) {
        heroTl.fromTo(
          heroMeta,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "+=0.2"
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-anim='section-header']")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

      const trustItems = gsap.utils.toArray<HTMLElement>(
        "[data-anim='trust-item']"
      );
      if (trustItems.length) {
        gsap.fromTo(
          trustItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: trustItems[0], start: "top 85%" },
          }
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-anim='trust-number']")
        .forEach((el, index) => {
          const target = Number(el.dataset.value ?? "0");
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.value).toString();
            },
          });
        });

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-anim='property-card']"
      );
      if (cards.length) {
        ScrollTrigger.batch(cards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.08,
              }
            ),
        });
      }

      const paulaPhoto = root.querySelector<HTMLElement>(
        "[data-anim='paula-photo']"
      );
      if (paulaPhoto) {
        gsap.fromTo(
          paulaPhoto,
          { opacity: 0, scale: 1.02 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: paulaPhoto, start: "top 85%" },
          }
        );
      }

      const paulaLines = root.querySelectorAll<HTMLElement>(
        "[data-anim='paula-line']"
      );
      if (paulaLines.length) {
        gsap.fromTo(
          paulaLines,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: paulaLines[0], start: "top 85%" },
          }
        );
      }
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
