"use client";

import React, { useState } from "react";
import { AvailabilityEditorModal, BlockDatesModal } from "./AvailabilityEditor";

export default function ScheduleActions() {
  const [showAvailability, setShowAvailability] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <button
          onClick={() => setShowAvailability(true)}
          className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 transition"
        >
          Edit Weekly Availability
        </button>
        <button
          onClick={() => setShowBlock(true)}
          className="w-full text-left px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded border border-transparent hover:border-rose-100 transition"
        >
          Block Dates (Leave)
        </button>
      </div>

      {showAvailability && <AvailabilityEditorModal onClose={() => setShowAvailability(false)} />}
      {showBlock && <BlockDatesModal onClose={() => setShowBlock(false)} />}
    </>
  );
}
