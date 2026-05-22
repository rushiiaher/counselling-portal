"use client";

import { useState } from "react";
import { updateProgramStatusAction } from "@/app/actions/program.actions";
import { Feedback } from "@/lib/feedback";
import { useRouter } from "next/navigation";

const NEXT_STATUS: Record<string, { label: string; value: string }[]> = {
  DRAFT: [{ label: "Schedule", value: "SCHEDULED" }, { label: "Cancel", value: "CANCELLED" }],
  SCHEDULED: [{ label: "Mark Ongoing", value: "ONGOING" }, { label: "Cancel", value: "CANCELLED" }],
  ONGOING: [{ label: "Mark Completed", value: "COMPLETED" }, { label: "Cancel", value: "CANCELLED" }],
  COMPLETED: [],
  CANCELLED: [],
};

export default function ProgramStatusButton({ programId, currentStatus }: { programId: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const actions = NEXT_STATUS[currentStatus] ?? [];

  if (actions.length === 0) return null;

  const handleUpdate = async (status: string) => {
    setLoading(true);
    const res = await updateProgramStatusAction(programId, status as any);
    if (res.success) { Feedback.success("Status updated"); router.refresh(); }
    else Feedback.error(res.error ?? "Failed");
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      {actions.map((a) => (
        <button key={a.value} onClick={() => handleUpdate(a.value)} disabled={loading}
          className={`text-sm px-4 py-1.5 rounded-lg font-medium disabled:opacity-50 ${
            a.value === "CANCELLED" ? "bg-red-100 text-red-700 hover:bg-red-200" :
            "bg-slate-900 text-white hover:bg-slate-800"
          }`}>
          {a.label}
        </button>
      ))}
    </div>
  );
}
