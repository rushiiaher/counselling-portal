"use client";

import { useState } from "react";
import BookAppointmentModal from "./BookAppointmentModal";

interface BookAppointmentButtonProps {
  className?: string;
  label?: string;
}

export default function BookAppointmentButton({
  className = "",
  label = "Book Appointment",
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BookAppointmentModal isOpen={open} onClose={() => setOpen(false)} />
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
    </>
  );
}
