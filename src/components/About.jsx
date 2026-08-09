"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/data/site";

export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading eyebrow="Who I Am" title="About Me" />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(91,140,255,0.2),transparent_60%)] blur-xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d] aspect-[4/5]">
              <Image
                src={siteConfig.profileImage}
                alt={`${siteConfig.name} — Full Stack Web Developer`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 420px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
                <p className="text-sm text-white/65">{siteConfig.title}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 text-[var(--text-muted)] text-base md:text-lg leading-relaxed"
          >
            <p>
              I&apos;m Anamta Imran, a Full Stack Web Developer passionate about
              building modern, scalable, and user-friendly web applications.
            </p>
            <p>
              I specialize in both frontend and backend development, allowing me
              to work across the complete development lifecycle — from designing
              responsive interfaces to building APIs, authentication systems,
              databases, and full-stack applications.
            </p>
            <p>
              My core expertise includes Laravel and PHP, Node.js, Express.js,
              MERN Stack, Next.js, React.js, and Redux.
            </p>
            <p>
              I also have a strong interest in UI/UX design and use Figma to
              create clean and intuitive user experiences.
            </p>
            <p>
              I enjoy solving problems, learning new technologies, and turning
              ideas into functional digital products.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
