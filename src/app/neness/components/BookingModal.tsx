"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  BOOKING_CONFIG,
  BOOKING_FORMSPREE_ENDPOINT,
  BOOKING_LOOKAHEAD_DAYS,
  EMAILJS_ENABLED,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  type SlotPeriod,
} from "../booking-config";
import { pauseLenis, resumeLenis } from "../lenis-instance";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

type AvailableDate = {
  iso: string; // YYYY-MM-DD
  weekday: string; // "Mon"
  day: number; // 22
  month: string; // "Sep"
  full: string; // "Monday, September 22"
};

/** Next N weekdays (Mon–Fri), starting tomorrow. Weekend skipping is the
 *  only "closed day" rule here — add holidays or other exclusions in this
 *  function if needed. */
function getAvailableDates(count: number): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      dates.push({
        iso: cursor.toISOString().slice(0, 10),
        weekday: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        day: cursor.getDate(),
        month: cursor.toLocaleDateString("en-US", { month: "short" }),
        full: cursor.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

/** Parses "9:00 AM" / "1:30 PM" into 24h {hour, minute}. */
function parseTime(time: string): { hour: number; minute: number } {
  const [, h, m, meridiem] = time.match(/(\d+):(\d+)\s?(AM|PM)/i) ?? [];
  let hour = Number(h) % 12;
  if (/pm/i.test(meridiem)) hour += 12;
  return { hour, minute: Number(m) };
}

function buildGoogleCalendarLink({
  title,
  isoDate,
  time,
  durationHours,
  details,
  location,
}: {
  title: string;
  isoDate: string;
  time: string;
  durationHours: number;
  details: string;
  location: string;
}): string {
  const { hour, minute } = parseTime(time);
  const start = new Date(`${isoDate}T00:00:00`);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const PERIOD_LABEL: Record<SlotPeriod, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
};

export default function BookingModal({
  serviceId,
  onClose,
}: {
  serviceId: string;
  onClose: () => void;
}) {
  const service = BOOKING_CONFIG[serviceId];
  const dates = useMemo(() => getAvailableDates(BOOKING_LOOKAHEAD_DAYS), []);

  const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Lock background scroll while the modal is open. Lenis (the site's
  // smooth-scroll library) hijacks wheel/touch scrolling at the window
  // level with its own JS-driven scroll, which ignores plain CSS
  // `overflow: hidden` on body — so it has to be paused explicitly, or
  // scrolling inside the modal keeps scrolling the page behind it.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseLenis();
    return () => {
      document.body.style.overflow = prev;
      resumeLenis();
    };
  }, []);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!service) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError("Please choose a date and time.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();

    if (!name || !email || !phone || !address) {
      setError("Please fill in every field.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitting");

    const calendarLink = buildGoogleCalendarLink({
      title: `Neness — ${service.label} (${data.get("name")})`,
      isoDate: selectedDate.iso,
      time: selectedTime,
      durationHours: service.durationHours,
      details: `Preferred appointment requested via neness.com.\nClient: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nThis is a PREFERRED slot, not a confirmed booking — confirm with the client before adding.`,
      location: address,
    });

    data.set("service", service.label);
    data.set("preferred_date", selectedDate.full);
    data.set("preferred_time", selectedTime);
    data.set(
      "add_to_google_calendar",
      calendarLink
    );
    data.set(
      "_subject",
      `New booking request — ${service.label} — ${selectedDate.full} ${selectedTime}`
    );

    try {
      const response = await fetch(BOOKING_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        setStatus("success");

        // Confirmation email to the CLIENT (not us) — see the EmailJS
        // setup instructions in booking-config.ts. Best-effort: if this
        // fails, the booking request itself already succeeded above, so
        // we don't show the visitor an error over a missed confirmation
        // email — just log it for us to notice.
        if (EMAILJS_ENABLED) {
          emailjs
            .send(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              {
                to_email: email,
                to_name: name,
                service_name: service.label,
                appointment_date: selectedDate.full,
                appointment_time: selectedTime,
              },
              { publicKey: EMAILJS_PUBLIC_KEY }
            )
            .catch((err) => {
              console.error("EmailJS confirmation email failed:", err);
            });
        }

        // ─────────────────────────────────────────────────────────────
        // META PIXEL — NOT installed yet. Once the pixel script is added
        // to layout.tsx, uncomment this to fire a Lead event on every
        // successful booking-request submission:
        //
        // if (typeof window !== "undefined" && (window as any).fbq) {
        //   (window as any).fbq("track", "Lead", {
        //     content_name: service.label,
        //     content_category: "booking_request",
        //   });
        // }
        // ─────────────────────────────────────────────────────────────
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again, or call us instead.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again, or call us instead.");
    }
  }

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-transparent px-3.5 py-2.5 font-sans text-[15px] text-foreground placeholder:text-muted outline-none transition-colors focus:border-white/40 md:text-[16px]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${service.label}`}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel. Wheel/touch events stop here so they never reach Lenis's
          window-level listener — that lets the browser scroll the panel's
          own overflow-y-auto content natively, even while Lenis is paused
          for the page behind it. */}
      <div
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-background text-left shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 text-foreground/70 transition-colors hover:text-foreground"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          {status === "success" ? (
            <div className="flex flex-col items-start py-6 text-left">
              <h3 className="text-service-name text-foreground">
                Request received
              </h3>
              <p className="text-body-l mt-4 text-foreground/80">
                We&apos;ve received your preferred appointment for{" "}
                <strong className="font-medium text-foreground">
                  {service.label}
                </strong>{" "}
                on {selectedDate?.full} at {selectedTime}. We&apos;ll confirm
                by phone or email within 24 hours.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3 font-sans text-[15px] font-medium text-background transition-colors hover:bg-foreground/90 md:text-[16px]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="text-meta text-foreground/60">{service.label}</p>
              <h3 className="text-service-name mt-1 text-foreground">
                Choose a date &amp; time
              </h3>

              <form onSubmit={handleSubmit} noValidate className="mt-8">
                {/* Date picker */}
                <p className="text-meta text-foreground/70">Date</p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {dates.map((d) => {
                    const active = selectedDate?.iso === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d);
                          setSelectedTime(null);
                        }}
                        className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-2.5 font-sans text-[13px] transition-colors ${
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-white/15 text-foreground/80 hover:border-white/35"
                        }`}
                      >
                        <span className="uppercase tracking-[0.06em]">
                          {d.weekday}
                        </span>
                        <span className="mt-0.5 text-[15px] font-medium">
                          {d.day}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time picker */}
                <div className="mt-6">
                  <p className="text-meta text-foreground/70">Time</p>
                  {!selectedDate ? (
                    <p className="mt-3 text-[14px] text-foreground/50">
                      Pick a date first.
                    </p>
                  ) : (
                    <div className="mt-3 flex flex-col gap-4">
                      {service.periods.map((period) => {
                        const times =
                          period === "morning"
                            ? service.morningTimes
                            : service.afternoonTimes;
                        if (times.length === 0) return null;
                        return (
                          <div key={period}>
                            <p className="text-[12px] uppercase tracking-[0.1em] text-foreground/50">
                              {PERIOD_LABEL[period]}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {times.map((t) => {
                                const active = selectedTime === t;
                                return (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setSelectedTime(t)}
                                    className={`rounded-full border px-4 py-2 font-sans text-[13px] transition-colors ${
                                      active
                                        ? "border-foreground bg-foreground text-background"
                                        : "border-white/15 text-foreground/80 hover:border-white/35"
                                    }`}
                                  >
                                    {t}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Contact fields */}
                <div className="mt-8 grid grid-cols-1 gap-3">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="text-meta text-foreground/70"
                    >
                      Name
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="text-meta text-foreground/70"
                    >
                      Email
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="text-meta text-foreground/70"
                    >
                      Phone
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(858) 000-0000"
                      className={`${fieldClass} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-address"
                      className="text-meta text-foreground/70"
                    >
                      Address
                    </label>
                    <input
                      id="booking-address"
                      name="address"
                      type="text"
                      required
                      placeholder="Street address, San Diego, CA"
                      className={`${fieldClass} mt-1.5`}
                    />
                    <p className="mt-1.5 text-[12px] text-foreground/50">
                      Services are performed at your home, office, or private
                      garage in San Diego.
                    </p>
                  </div>
                </div>

                {error ? (
                  <p className="mt-5 text-[14px] text-red-400">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-sans text-[15px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto md:text-[16px]"
                >
                  {status === "submitting"
                    ? "Sending…"
                    : "Request this appointment"}
                </button>

                <p className="mt-3 text-[13px] leading-snug text-foreground/60">
                  We&apos;ll confirm your appointment within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
