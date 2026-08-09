"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  const prefersReduced = useReducedMotion();

  return {
    prefersReduced,
    fadeUp: prefersReduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
        },
    fadeIn: prefersReduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        },
    scaleIn: prefersReduced
      ? { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } }
      : {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
        },
    transition: prefersReduced
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    stagger: prefersReduced ? 0 : 0.08,
  };
}
