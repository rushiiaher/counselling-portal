"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { resolveCrisisSessionAction } from "@/app/actions/admin.actions";
import { Feedback } from "@/lib/feedback";
import { useRouter } from "next/navigation";

export default function CrisisActions({ sessionId }: { sessionId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleResolve = () => {
    startTransition(async () => {
      const res = await resolveCrisisSessionAction(sessionId);
      if (res.success) {
        Feedback.success("Crisis session closed");
        router.refresh();
      } else {
        Feedback.error(res.error || "Failed");
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Link href={`/staff/inbox/${sessionId}`} className="text-xs font-bold text-blue-600 hover:underline">
        View Transcript
      </Link>
      <button
        onClick={handleResolve}
        disabled={isPending}
        className="text-xs font-bold text-emerald-600 hover:underline disabled:opacity-50"
      >
        {isPending ? "Closing..." : "Resolve"}
      </button>
    </div>
  );
}
