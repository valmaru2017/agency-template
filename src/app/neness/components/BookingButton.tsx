"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingButton({
  serviceId,
  className,
}: {
  serviceId: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Book Now
        <span className="text-white transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      {open ? (
        <BookingModal serviceId={serviceId} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
