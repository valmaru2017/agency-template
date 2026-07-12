"use client";

import { useState, type FormEvent } from "react";

const PROJECT_TYPES = [
  "Fix & Flip",
  "Kitchen",
  "Bathroom",
  "Full Renovation",
  "Other",
];

const inputClass =
  "w-full border-0 border-b border-background/40 bg-transparent px-0 py-3 font-sans text-[16px] text-background placeholder:text-background/50 focus:border-background focus:outline-none";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!phone) nextErrors.phone = "Please enter a phone number.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (!address) nextErrors.address = "Please enter the property address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <section
      id="contact"
      className="bg-accent px-5 py-16 md:px-12 md:py-[100px]"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="text-meta text-background">REQUEST A QUOTE</p>
          <h2 className="text-display-l mt-4 text-background">
            Tell us about your project.
          </h2>
          <p className="text-body mt-6 max-w-[45ch] text-background">
            We respond within 24 hours with a detailed estimate.
          </p>
        </div>

        <div className="md:col-span-5">
          {submitted ? (
            <p className="text-display-m text-background">
              We&apos;ll be in touch within 24 hours.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="mt-1 font-sans text-[12px] text-background">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={inputClass}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p className="mt-1 font-sans text-[12px] text-background">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1 font-sans text-[12px] text-background">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <select
                  name="projectType"
                  defaultValue=""
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled className="text-foreground">
                    Project Type
                  </option>
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type} className="text-foreground">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Property Address"
                  className={inputClass}
                  aria-invalid={Boolean(errors.address)}
                />
                {errors.address && (
                  <p className="mt-1 font-sans text-[12px] text-background">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-fit rounded bg-background px-10 py-4 font-sans text-[16px] font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Send Request
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
