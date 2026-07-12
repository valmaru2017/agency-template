"use client";

import { useState } from "react";

const RITUALS = ["The Deep Warmth", "Volcanic Stone", "The Renewal Facial"];
const TIMES = ["Morning", "Afternoon", "Evening"];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="delfos-section bg-surface-dark">
      <div className="mx-auto max-w-[1440px] px-5 md:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div data-anim="section-header" className="md:col-span-4">
            <p className="text-meta text-accent">RESERVE YOUR TIME</p>
            <h2 className="text-display-l mt-4 text-background">
              Book a ritual.
            </h2>
            <p className="text-body mt-6 max-w-[36ch] text-background/70">
              Tell us a little about what you need. We&apos;ll confirm your
              appointment within one business day.
            </p>
          </div>

          <div className="md:col-span-8">
            {submitted ? (
              <div
                data-anim="about-line"
                className="border-t border-background/15 pt-10"
              >
                <p className="text-display-m text-background">
                  Thank you. Your request has been received.
                </p>
                <p className="text-body mt-3 text-background/70">
                  A member of our team will reach out shortly to confirm your
                  ritual and time.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-meta text-background/70">
                    FULL NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-meta text-background/70">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-meta text-background/70">
                    PHONE
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="ritual" className="text-meta text-background/70">
                    RITUAL
                  </label>
                  <select
                    id="ritual"
                    name="ritual"
                    required
                    defaultValue=""
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled className="text-foreground">
                      Select a ritual
                    </option>
                    {RITUALS.map((ritual) => (
                      <option key={ritual} value={ritual} className="text-foreground">
                        {ritual}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-meta text-background/70">
                    PREFERRED DATE
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="time" className="text-meta text-background/70">
                    PREFERRED TIME
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    defaultValue=""
                    className="border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled className="text-foreground">
                      Select a time
                    </option>
                    {TIMES.map((time) => (
                      <option key={time} value={time} className="text-foreground">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="notes" className="text-meta text-background/70">
                    NOTES (OPTIONAL)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="resize-none border-b border-background/25 bg-transparent py-2 text-body text-background outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="mt-2 bg-accent px-8 py-4 font-sans text-[15px] font-medium text-background transition-colors hover:bg-accent-hover"
                  >
                    Request Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
