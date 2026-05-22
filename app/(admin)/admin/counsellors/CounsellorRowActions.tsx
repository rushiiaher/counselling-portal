"use client";

import { useTransition } from "react";
import { toggleUserActiveAction, toggleCounsellorVerifiedAction } from "@/app/actions/admin.actions";
import { Feedback } from "@/lib/feedback";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CounsellorRowActions({
  counsellorId, userId, isVerified, isActive,
}: {
  counsellorId: string; userId: string; isVerified: boolean; isActive: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const toggleVerify = () => {
    startTransition(async () => {
      const res = await toggleCounsellorVerifiedAction(counsellorId, !isVerified);
      if (res.success) { Feedback.success(isVerified ? "Verification revoked" : "Counsellor verified"); router.refresh(); }
      else Feedback.error(res.error ?? "Failed");
    });
  };

  const toggleActive = () => {
    startTransition(async () => {
      const res = await toggleUserActiveAction(userId, !isActive);
      if (res.success) { Feedback.success(isActive ? "Deactivated" : "Activated"); router.refresh(); }
      else Feedback.error(res.error ?? "Failed");
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Link href={`/admin/counsellors/${counsellorId}`}
        className="text-xs text-blue-600 hover:underline font-medium">
        Edit
      </Link>
      <button onClick={toggleVerify} disabled={pending}
        className={`text-xs font-medium hover:underline disabled:opacity-50 ${isVerified ? "text-amber-600" : "text-green-600"}`}>
        {isVerified ? "Unverify" : "Verify"}
      </button>
      <button onClick={toggleActive} disabled={pending}
        className={`text-xs font-medium hover:underline disabled:opacity-50 ${isActive ? "text-red-500" : "text-green-600"}`}>
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}
