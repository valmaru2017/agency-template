"use client";

import { useState, type FormEvent } from "react";

// ─────────────────────────────────────────────────────────────────────────
// 1) Create a form at https://formspree.io (free tier is fine).
// 2) Paste your form endpoint below, replacing the placeholder URL.
//    It looks like: https://formspree.io/f/xxxxxxxx
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
// ─────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    // Phone is optional — intentionally not part of the required check below.

    if (!name || !email || !message) {
      setError("Please fill in every field.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again, or call us instead.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again, or call us instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-ink/10 px-6 py-8 text-center">
        <p className="text-body text-ink">
          Message sent. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 font-sans text-[15px] text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink/40 md:text-[16px]";

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label htmlFor="contact-name" className="text-meta text-ink-muted">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={`${fieldClass} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-meta text-ink-muted">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={`${fieldClass} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-meta text-ink-muted">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="(optional)"
            className={`${fieldClass} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-meta text-ink-muted">
            Tell us about your automobile
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="Tell us about your automobile and what it needs."
            className={`${fieldClass} mt-1.5 resize-none`}
          />
        </div>
      </div>

      {error ? <p className="mt-3 text-[17px] text-red-600 md:text-[15px]">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-sans text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto md:text-[16px]"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
