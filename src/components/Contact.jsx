"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/data/site";

const initial = { name: "", email: "", subject: "", message: "" };

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Contact() {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const formConfigured = Boolean(accessKey);

  const socials = [
    {
      label: "Email",
      href: `mailto:${siteConfig.email}`,
      value: siteConfig.email,
      icon: Mail,
    },
    {
      label: "GitHub",
      href: siteConfig.github,
      value: siteConfig.github,
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: siteConfig.linkedin,
      value: siteConfig.linkedin,
      icon: Linkedin,
    },
  ];

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    if (!formConfigured) {
      setStatus("error");
      setStatusMessage(
        "Contact form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your .env.local file."
      );
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage("Message sent successfully. I'll get back to you soon.");
      setForm(initial);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message || "Something went wrong. Please try again or email me directly."
      );
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle" && status !== "loading") setStatus("idle");
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          description="Have an idea, project, or opportunity? Let's build something meaningful together."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-10">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Email" ? undefined : "_blank"}
                  rel={item.label === "Email" ? undefined : "noopener noreferrer"}
                  className="card-surface flex items-center gap-4 p-4 transition-colors hover:border-[rgba(91,140,255,0.35)] focus-ring"
                  data-cursor="hover"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--accent)]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-white/45">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-base text-white/85 break-all">
                      {item.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="card-surface p-5 md:p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={onChange}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                error={errors.email}
                autoComplete="email"
              />
            </div>
            <Field
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={onChange}
              error={errors.subject}
            />
            <Field
              label="Message"
              name="message"
              as="textarea"
              rows={5}
              value={form.message}
              onChange={onChange}
              error={errors.message}
            />

            <button
              type="submit"
              className="btn-primary w-full sm:w-auto focus-ring disabled:opacity-60 disabled:pointer-events-none"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={16} aria-hidden="true" />
              )}
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 text-sm text-[var(--success)]"
                  role="status"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  {statusMessage}
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 text-sm text-[var(--error)]"
                  role="alert"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {statusMessage}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  rows,
  autoComplete,
}) {
  const id = `contact-${name}`;
  const shared =
    "w-full rounded-xl border bg-[#090909] px-3.5 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[rgba(91,140,255,0.55)]";
  const border = error ? "border-[rgba(248,113,113,0.55)]" : "border-white/10";

  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="text-sm text-white/70">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`${shared} ${border} resize-y min-h-[120px]`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${shared} ${border}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <span id={`${id}-error`} className="block text-xs text-[var(--error)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
