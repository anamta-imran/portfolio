"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "GitHub",
      href: siteConfig.github.startsWith("YOUR_") ? "#" : siteConfig.github,
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin.startsWith("YOUR_") ? "#" : siteConfig.linkedin,
      icon: Linkedin,
    },
    {
      label: "Email",
      href: siteConfig.email.startsWith("YOUR_")
        ? "#"
        : `mailto:${siteConfig.email}`,
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-white/8 pt-14 pb-8">
      <div className="section-pad container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              {siteConfig.name.toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-white/60">{siteConfig.title}</p>
            <p className="mt-3 max-w-md text-sm text-[var(--text-muted)] leading-relaxed">
              {siteConfig.footerTagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.label === "Email" ? undefined : "_blank"}
                  rel={item.label === "Email" ? undefined : "noopener noreferrer"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-[rgba(91,140,255,0.4)] hover:text-white focus-ring"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/40">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <a href="#home" className="hover:text-white/70 focus-ring rounded-sm">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
