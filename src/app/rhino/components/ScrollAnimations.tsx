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

      if (heroPhoto) {
        heroTl.fromTo(
          heroPhoto,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0
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

      const serviceCards = gsap.utils.toArray<HTMLElement>(
        "[data-anim='service-card']"
      );
      if (serviceCards.length) {
        ScrollTrigger.batch(serviceCards, {
          start: "top 88%",
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

      const projectCards = gsap.utils.toArray<HTMLElement>(
        "[data-anim='project-card']"
      );
      if (projectCards.length) {
        ScrollTrigger.batch(projectCards, {
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

      const teamPhoto = root.querySelector<HTMLElement>(
        "[data-anim='team-photo']"
      );
      if (teamPhoto) {
        gsap.fromTo(
          teamPhoto,
          { opacity: 0, scale: 1.02 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: teamPhoto, start: "top 85%" },
          }
        );
      }

      const aboutLines = root.querySelectorAll<HTMLElement>(
        "[data-anim='about-line']"
      );
      if (aboutLines.length) {
        gsap.fromTo(
          aboutLines,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: aboutLines[0], start: "top 85%" },
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
