"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const alignClass =
    align === "center" ? "text-center mx-auto items-center" : "items-start";

  return (
    <motion.div
      className={`mb-12 md:mb-16 flex flex-col gap-4 max-w-3xl ${alignClass} ${className}`}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <span className="text-xs md:text-sm tracking-[0.22em] uppercase text-[var(--accent)] font-medium">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {description ? (
        <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
