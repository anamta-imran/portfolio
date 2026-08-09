"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-16 md:py-24">
      <div className="section-pad container-max">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 px-6 py-14 md:px-12 md:py-20 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,140,255,0.22),transparent_55%)]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <motion.div
            aria-hidden="true"
            className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[rgba(139,92,246,0.18)] blur-3xl"
            animate={prefersReduced ? undefined : { x: [0, 24, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-[rgba(91,140,255,0.16)] blur-3xl"
            animate={prefersReduced ? undefined : { y: [0, 18, 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-[1]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-[var(--text-muted)]">
              I&apos;m always interested in learning, building, and taking on new
              challenges.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#projects" className="btn-primary focus-ring">
                View My Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn-secondary focus-ring">
                <Mail size={16} aria-hidden="true" />
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
