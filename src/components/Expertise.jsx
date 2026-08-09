"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { expertise } from "@/data/skills";

export default function Expertise() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="expertise" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Capabilities"
          title="My Expertise"
          description="A focused set of strengths spanning backend systems, modern frontend frameworks, and thoughtful interface design."
        />

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {expertise.map((item, index) => (
            <motion.article
              key={item.id}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: prefersReduced ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={prefersReduced ? undefined : { y: -6 }}
              className="group card-surface p-6 md:p-7 transition-colors hover:border-[rgba(91,140,255,0.35)]"
              data-cursor="hover"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-sm text-[var(--accent)]">
                  {item.id}
                </span>
                <span className="h-px w-12 bg-gradient-to-r from-[var(--accent)]/60 to-transparent transition-all group-hover:w-16" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
