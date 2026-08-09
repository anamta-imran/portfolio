"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { journey } from "@/data/skills";

export default function DevelopmentJourney() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Growth Path"
          title="Development Journey"
          description="A project-driven learning path focused on building real full-stack applications — not a list of invented job titles."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--accent)]/60 via-white/15 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <ol className="space-y-6 md:space-y-10">
            {journey.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.li
                  key={step}
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReduced ? 0 : index * 0.05,
                  }}
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10"
                >
                  {isLeft ? (
                    <div className="hidden md:block md:pr-8 md:text-right">
                      <JourneyCard index={index} step={step} />
                    </div>
                  ) : (
                    <div className="hidden md:block" aria-hidden="true" />
                  )}

                  {!isLeft ? (
                    <div className="hidden md:block md:pl-8">
                      <JourneyCard index={index} step={step} />
                    </div>
                  ) : (
                    <div className="hidden md:block" aria-hidden="true" />
                  )}

                  <div className="md:hidden">
                    <JourneyCard index={index} step={step} />
                  </div>

                  <span className="absolute left-[0.85rem] top-5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[#050505] shadow-[0_0_16px_rgba(91,140,255,0.55)] md:left-1/2 md:-translate-x-1/2" />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ index, step }) {
  return (
    <div className="inline-block w-full rounded-2xl border border-white/10 bg-[#0d0d0d] px-5 py-4 text-left shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <span className="mb-1 block font-mono text-xs text-[var(--accent)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-display text-lg font-semibold">{step}</h3>
    </div>
  );
}
