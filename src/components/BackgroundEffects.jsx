"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundEffects() {
  const prefersReduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 50, y: 30 });

  useEffect(() => {
    if (prefersReduced) return undefined;
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute inset-0 grid-bg opacity-60" />

      <motion.div
        className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,140,255,0.18), transparent 70%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { opacity: [0.45, 0.7, 0.45], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute h-[28rem] w-[28rem] rounded-full blur-[110px] transition-all duration-700 ease-out"
        style={{
          left: `calc(${mouse.x}% - 14rem)`,
          top: `calc(${mouse.y}% - 14rem)`,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] right-[-5%] h-[24rem] w-[24rem] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,140,255,0.12), transparent 70%)",
        }}
        animate={prefersReduced ? undefined : { y: [0, -24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {!prefersReduced &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              left: `${8 + ((i * 17) % 84)}%`,
              top: `${12 + ((i * 29) % 76)}%`,
            }}
            animate={{
              y: [0, -18 - (i % 5) * 4, 0],
              opacity: [0.15, 0.55, 0.15],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
    </div>
  );
}
