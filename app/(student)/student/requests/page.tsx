import { getMyRequestsAction } from "@/app/actions/support-request.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { ArrowRight, Plus, FileText } from "lucide-react";

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
  CRITICAL: "text-red-600 font-bold",
  HIGH: "text-orange-500 font-semibold",
  MEDIUM: "text-slate-500",
  LOW: "text-slate-400",
};

export default async function StudentRequestsPage() {
  const res = await getMyRequestsAction();
  const requests = res.data ?? [];

  const active = requests.filter((r) => !["RESOLVED", "ESCALATED"].includes(r.status));
  const closed = requests.filter((r) => ["RESOLVED", "ESCALATED"].includes(r.status));

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Requests</h1>
            <p className="text-slate-500 text-sm mt-0.5">Track the status of your support requests</p>
          </div>
          <Link href="/student/services"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            <Plus className="w-4 h-4" /> New Request
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FileText className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-500">No requests yet.</p>
            <Link href="/student/services"
              className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
              Request Support
            </Link>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Active</h2>
                <div className="space-y-2">
                  {active.map((r) => (
                    <RequestCard key={r.id} r={r} />
                  ))}
                </div>
              </section>
            )}

            {closed.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Closed</h2>
                <div className="space-y-2 opacity-75">
                  {closed.map((r) => (
                    <RequestCard key={r.id} r={r} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}

function RequestCard({ r }: { r: any }) {
  return (
    <Link href={`/student/requests/${r.id}`}
      className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-5 py-4 hover:shadow-sm transition group">
      <div className="space-y-1 min-w-0">
        <div className="flex flex-wrap gap-1">
          {r.serviceCategories.slice(0, 2).map((cat: string) => (
            <span key={cat} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">
              {cat.replace(/_/g, " ")}
            </span>
          ))}
          {r.serviceCategories.length > 2 && (
            <span className="text-xs text-slate-400">+{r.serviceCategories.length - 2} more</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          {r.assignedCounsellor && (
            <span>· Counsellor: <strong className="text-slate-700">{r.assignedCounsellor.user?.name}</strong></span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <div className="text-right">
          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>
            {r.status.replace(/_/g, " ")}
          </span>
          <p className={`text-xs mt-1 ${URGENCY_COLORS[r.urgency] ?? "text-slate-400"}`}>{r.urgency}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition" />
      </div>
    </Link>
  );
}
