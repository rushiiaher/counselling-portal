"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { getMyReferralsAction, updateReferralStatusAction } from "@/app/actions/guidance.actions";
import { Feedback } from "@/lib/feedback";
import { UserCheck } from "lucide-react";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function StaffReferralsPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = async () => {
    const res = await getMyReferralsAction();
    if (res.success) setReferrals(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id: string, status: string) => {
    setUpdating(id);
    const res = await updateReferralStatusAction(id, status as any);
    if (res.success) { Feedback.success("Updated"); load(); }
    else Feedback.error(res.error ?? "Failed");
    setUpdating(null);
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Referrals</h1>

        {loading ? (
          <div className="text-slate-400 text-sm py-8">Loading...</div>
        ) : referrals.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <UserCheck className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400">No referrals made yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((ref) => (
              <div key={ref.id} className="bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-800 text-sm">
                      <Link href={`/staff/cases/${ref.requestId}`} className="hover:underline">
                        {ref.student?.user?.name ?? "Student"}
                      </Link>
                    </p>
                    <p className="text-xs text-slate-500">
                      → {ref.targetAgency ?? ref.referralTarget.replace(/_/g, " ")}
                    </p>
                    {ref.reason && <p className="text-xs text-slate-400 line-clamp-2">{ref.reason}</p>}
                    <p className="text-xs text-slate-300">
                      {new Date(ref.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[ref.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {ref.status}
                    </span>
                    {ref.status === "PENDING" && (
                      <div className="flex gap-1">
                        <button onClick={() => handleStatus(ref.id, "ACCEPTED")} disabled={updating === ref.id}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 disabled:opacity-50">
                          Accept
                        </button>
                        <button onClick={() => handleStatus(ref.id, "COMPLETED")} disabled={updating === ref.id}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 disabled:opacity-50">
                          Done
                        </button>
                        <button onClick={() => handleStatus(ref.id, "CANCELLED")} disabled={updating === ref.id}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50">
                          Cancel
                        </button>
                      </div>
                    )}
                    {ref.status === "ACCEPTED" && (
                      <button onClick={() => handleStatus(ref.id, "COMPLETED")} disabled={updating === ref.id}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 disabled:opacity-50">
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
