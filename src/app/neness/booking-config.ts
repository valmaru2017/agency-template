// ═══════════════════════════════════════════════════════════════════════
// BOOKING SCHEDULER CONFIG — everything about availability lives here.
// Edit this file (not the components) to change dates, times, or which
// services can be booked through the in-page scheduler.
// ═══════════════════════════════════════════════════════════════════════

// How far ahead to offer dates, in business days (Mon–Fri), starting
// tomorrow (today is intentionally excluded — see the 24h-confirmation
// copy in the scheduler).
export const BOOKING_LOOKAHEAD_DAYS = 10;

export type SlotPeriod = "morning" | "afternoon";

export type ServiceBookingConfig = {
  /** Must match a SERVICES[].id in Services.tsx */
  id: string;
  label: string;
  durationHours: number;
  /** Which time-of-day periods this service offers. Maintenance gets
   *  both; Signature (a longer job) is morning-only so it doesn't run
   *  into the evening. Add/remove "morning" | "afternoon" to change. */
  periods: SlotPeriod[];
  /** The actual clock times offered within each period. Edit these
   *  arrays directly to add, remove, or change specific time slots. */
  morningTimes: string[];
  afternoonTimes: string[];
};

// One entry per bookable service. Only services listed here get the
// "Book Now" button wired to the scheduler — Stewardship intentionally
// isn't (it's consultation-only, see Services.tsx).
export const BOOKING_CONFIG: Record<string, ServiceBookingConfig> = {
  maintenance: {
    id: "maintenance",
    label: "Maintenance",
    durationHours: 3,
    periods: ["morning", "afternoon"],
    morningTimes: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    afternoonTimes: ["12:00 PM", "1:00 PM"],
  },
  signature: {
    id: "signature",
    label: "Signature",
    durationHours: 6,
    periods: ["morning"],
    morningTimes: ["7:00 AM", "8:00 AM", "9:00 AM"],
    afternoonTimes: [],
  },
};

// ═══════════════════════════════════════════════════════════════════════
// WHERE THE BOOKING REQUEST (with all the client's info) GETS EMAILED TO
// ═══════════════════════════════════════════════════════════════════════
// 1) Create a form at https://formspree.io (free tier is fine) — use the
//    email address you want booking requests to arrive at when you sign
//    up. Make a separate form from the main contact form, so booking
//    requests land in their own inbox thread instead of mixing in.
// 2) Paste your form endpoint below, replacing the placeholder URL.
//    It looks like: https://formspree.io/f/xxxxxxxx
//    (You can see/change the destination email anytime in your Formspree
//    dashboard under that form's settings — that's what controls "which
//    email this goes to", not anything in this codebase.)
export const BOOKING_FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpndvry";

// ═══════════════════════════════════════════════════════════════════════
// AUTOMATIC "THANKS FOR BOOKING" EMAIL — sent to the CLIENT (not you)
// ═══════════════════════════════════════════════════════════════════════
// Formspree's free plan can't send the client a custom confirmation
// email (that's a paid "autoresponse" feature on their Gold plan). This
// uses EmailJS instead — a free service made exactly for sending emails
// straight from the browser, no server needed. 5-minute setup:
//
// 1) Create a free account at https://www.emailjs.com
// 2) Add an "Email Service" (connect the Gmail/Outlook/etc. account you
//    want these to send FROM) — this gives you a Service ID.
// 3) Create an Email Template with this content (or similar) — the
//    {{double_brace}} parts are filled in automatically per booking:
//      To:      {{to_email}}
//      Subject: Thanks for booking with Neness
//      Body:
//        Hi {{to_name}},
//
//        Thank you for booking with Neness! One of our representatives
//        will contact you within the next 24 hours to confirm your
//        {{service_name}} appointment on {{appointment_date}} at
//        {{appointment_time}}.
//
//        — Neness
//    Saving this template gives you a Template ID.
// 4) On your EmailJS account page, copy your Public Key.
// 5) Paste all three values below, replacing the placeholders.
//
// Leave EMAILJS_ENABLED as false to skip this step for now — booking
// requests still work and still reach you either way; the client just
// won't get an automatic confirmation email until this is turned on.
export const EMAILJS_ENABLED = false; // TODO: set to true once the 3 values below are filled in
export const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
export const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
export const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────
