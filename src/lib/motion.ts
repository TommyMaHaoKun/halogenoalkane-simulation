// Motion house style — Apple's damping/response model mapped to Framer Motion.
// Default is critically damped (no overshoot). Bounce is reserved for motion
// that follows a momentum-carrying gesture, never for something that just appeared.

import type { Transition } from "framer-motion";

/** Critically damped. The default for anything that simply moves or appears. */
export const springUI: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/** Snappier critically-damped spring for small, frequent state changes. */
export const springSnap: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.28,
};

/** Slight overshoot — only after a flick/throw, or for a sheet arriving. */
export const springMomentum: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.35,
};

/** Reduced-motion equivalent: a gentle cross-fade, no travel. */
export const fadeOnly: Transition = { duration: 0.2, ease: "easeOut" };

/**
 * Reveal props for content entering on scroll. Respects reduced motion by
 * dropping the translation and keeping only the opacity change (§14).
 */
export function reveal(reduced: boolean | null, y = 16) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: reduced ? fadeOnly : springUI,
  };
}
