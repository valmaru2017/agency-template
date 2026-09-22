import type Lenis from "lenis";

// The site's single Lenis instance (created in ScrollAnimations.tsx) is
// stashed here so any component — like BookingModal — can pause/resume
// it. This is needed because Lenis hijacks wheel/touch scrolling at the
// window level with its own JS-driven virtual scroll, which completely
// bypasses `body { overflow: hidden }` — without pausing Lenis, scrolling
// inside a modal keeps scrolling the page behind it instead.
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function pauseLenis() {
  instance?.stop();
}

export function resumeLenis() {
  instance?.start();
}
