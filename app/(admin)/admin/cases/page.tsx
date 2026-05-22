import { getAllRequestsAction } from "@/app/actions/support-request.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-orange-100 text-orange-700",
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
  SESSION_SCHEDULED: "bg-indigo-100 text-indigo-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  FOLLOW_UP_REQUIRED: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  ESCALATED: "bg-red-100 text-red-700",
};

const URGENCY_COLORS: Record<string, string> = {
  LOW: "text-slate-400", MEDIUM: "text-yellow-500",
  HIGH: "text-orange-500", CRITICAL: "text-red-600",
};

const URGENCY_LABELS = { LOW: "Low", MEDIUM: "Medium", HIGH: "High", CRITICAL: "⚠ CRITICAL" };

export default async function AdminCasesPage() {
  const res = await getAllRequestsAction();
  const all = res.data ?? [];

  const unassigned = all.filter((r) => r.status === "SUBMITTED" || r.status === "UNDER_REVIEW");
  const escalated = all.filter((r) => r.status === "ESCALATED");
  const active = all.filter((r) => !["RESOLVED", "ESCALATED"].includes(r.status));

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Cases Management</h1>
          <div className="flex gap-3 text-sm">
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-lg font-medium">{escalated.length} Escalated</span>
            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg font-medium">{unassigned.length} Unassigned</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">{active.length} Active</span>
          </div>
        </div>

        {/* Unassigned (needs action) */}
        {unassigned.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <h2 className="font-semibold text-yellow-800 flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" /> Pending Assignment — Assign Now
            </h2>
            <div className="space-y-2">
              {unassigned.map((r) => (
                <Link key={r.id} href={`/admin/cases/${r.id}`}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:shadow-sm transition group">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${URGENCY_COLORS[r.urgency]}`}>
                      {URGENCY_LABELS[r.urgency as keyof typeof URGENCY_LABELS]}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {(r as any).student?.user?.name ?? "Student"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(r as any).student?.institution?.name ?? (r as any).student?.district ?? "—"} ·{" "}
                        {r.serviceCategories.map((c) => c.replace(/_/g, " ")).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {Math.floor((Date.now() - new Date(r.createdAt).getTime()) / 86400000)}d ago
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Escalated */}
        {escalated.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h2 className="font-semibold text-red-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4" /> Escalated Cases — Urgent
            </h2>
            <div className="space-y-2">
              {escalated.map((r) => (
                <Link key={r.id} href={`/admin/cases/${r.id}`}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 hover:shadow-sm transition">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {(r as any).student?.user?.name ?? "Student"} — {r.serviceCategories.map((c) => c.replace(/_/g, " ")).join(", ")}
                    </p>
                    <p className="text-xs text-slate-500">
                      Counsellor: {(r as any).assignedCounsellor?.user?.name ?? "Unassigned"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All active cases */}
        <div>
          <h2 className="font-semibold text-slate-700 mb-3">All Cases ({all.length})</h2>
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Services</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Counsellor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Urgency</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {all.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{(r as any).student?.user?.name ?? "—"}</p>
                      <p className="text-xs text-slate-400">{(r as any).student?.institution?.name ?? (r as any).student?.district ?? ""}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {r.serviceCategories.map((c) => c.replace(/_/g, " ")).join(", ")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {r.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {(r as any).assignedCounsellor?.user?.name ?? <span className="text-orange-500">Unassigned</span>}
                    </td>
                    <td className={`px-4 py-3 text-xs font-semibold ${URGENCY_COLORS[r.urgency]}`}>
                      {r.urgency}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/cases/${r.id}`}
                        className="text-slate-500 hover:text-slate-800">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {all.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No cases yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
