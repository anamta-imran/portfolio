"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";

function CodeWindow() {
  const prefersReduced = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(prefersReduced ? 8 : 0);

  useEffect(() => {
    if (prefersReduced) {
      setVisibleLines(8);
      return undefined;
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setVisibleLines(n);
      if (n >= 8) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const lines = [
    <>
      <span className="text-[#c792ea]">const</span>{" "}
      <span className="text-[#82aaff]">developer</span>
      <span className="text-white/70"> = {"{"}</span>
    </>,
    <>
      <span className="text-[#c3e88d]">{"  "}name</span>
      <span className="text-white/70">: </span>
      <span className="text-[#c3e88d]">&quot;Anamta Imran&quot;</span>
      <span className="text-white/70">,</span>
    </>,
    <>
      <span className="text-[#c3e88d]">{"  "}role</span>
      <span className="text-white/70">: </span>
      <span className="text-[#c3e88d]">&quot;Full Stack Developer&quot;</span>
      <span className="text-white/70">,</span>
    </>,
    <>
      <span className="text-[#c3e88d]">{"  "}frontend</span>
      <span className="text-white/70">: [</span>
      <span className="text-[#c3e88d]">&quot;React&quot;</span>
      <span className="text-white/70">, </span>
      <span className="text-[#c3e88d]">&quot;Next.js&quot;</span>
      <span className="text-white/70">, </span>
      <span className="text-[#c3e88d]">&quot;Redux&quot;</span>
      <span className="text-white/70">],</span>
    </>,
    <>
      <span className="text-[#c3e88d]">{"  "}backend</span>
      <span className="text-white/70">: [</span>
      <span className="text-[#c3e88d]">&quot;Laravel&quot;</span>
      <span className="text-white/70">, </span>
      <span className="text-[#c3e88d]">&quot;PHP&quot;</span>
      <span className="text-white/70">, </span>
      <span className="text-[#c3e88d]">&quot;Node.js&quot;</span>
      <span className="text-white/70">],</span>
    </>,
    <>
      <span className="text-[#c3e88d]">{"  "}database</span>
      <span className="text-white/70">: [</span>
      <span className="text-[#c3e88d]">&quot;MongoDB&quot;</span>
      <span className="text-white/70">, </span>
      <span className="text-[#c3e88d]">&quot;MySQL&quot;</span>
      <span className="text-white/70">]</span>
    </>,
    <span className="text-white/70">{"}"};</span>,
    <>
      <span className="text-[#676e95]">{"// available for opportunities"}</span>
    </>,
  ];

  return (
    <motion.div
      className="relative w-full max-w-lg"
      initial={prefersReduced ? false : { opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(91,140,255,0.22),transparent_55%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]/90 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-white/40">
            developer.js
          </span>
        </div>
        <pre className="overflow-x-auto p-5 text-[12px] sm:text-[13px] leading-7 font-mono">
          <code>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                animate={
                  visibleLines > i
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -8 }
                }
                transition={{ duration: 0.35 }}
                className="whitespace-pre"
              >
                <span className="mr-4 inline-block w-4 select-none text-white/20">
                  {i + 1}
                </span>
                {line}
              </motion.div>
            ))}
          </code>
        </pre>
      </div>

      <motion.div
        className="absolute -bottom-5 -left-3 rounded-xl border border-white/10 bg-[#111]/90 px-3 py-2 text-xs text-white/80 shadow-xl backdrop-blur"
        animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[var(--accent)]">●</span> Available for work
      </motion.div>

      <motion.div
        className="absolute -right-2 top-16 rounded-xl border border-white/10 bg-[#111]/90 px-3 py-2 text-xs text-white/80 shadow-xl backdrop-blur"
        animate={prefersReduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        Full Stack • APIs • UI
      </motion.div>
    </motion.div>
  );
}

function WordReveal({ text, className = "", delay = 0 }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="section-pad container-max grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
        <div>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs md:text-sm tracking-[0.28em] uppercase text-[var(--accent)]"
          >
            Hello, I&apos;m
          </motion.p>

          <h1 className="font-display text-[clamp(2.4rem,7vw,4.75rem)] font-semibold leading-[1.05] tracking-tight">
            <WordReveal text={siteConfig.name} className="gradient-text" />
          </h1>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-3 font-display text-[clamp(1.35rem,3.4vw,2.35rem)] font-medium text-white/90"
          >
            {siteConfig.title}
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 max-w-xl text-base md:text-lg text-[var(--text-muted)] leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-4 text-sm md:text-base text-white/55"
          >
            {siteConfig.stackLine}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary focus-ring">
              View My Work
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.resume}
              className="btn-secondary focus-ring"
              download
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-2 py-2 text-sm text-white/70 hover:text-white transition-colors focus-ring rounded-md"
            >
              <Sparkles size={16} className="text-[var(--accent)]" aria-hidden="true" />
              Let&apos;s Connect
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}
