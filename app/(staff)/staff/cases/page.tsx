import { getMyCasesAction } from "@/app/actions/support-request.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-orange-100 text-orange-700",
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
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

export default async function StaffCasesPage() {
  const res = await getMyCasesAction();
  const cases = res.data ?? [];

  const pending = cases.filter((c) => (c as any).assignments?.length > 0);
  const closed = cases.filter((c) => ["RESOLVED", "ESCALATED"].includes(c.status));
  const open = cases.filter((c) => !["RESOLVED", "ESCALATED"].includes(c.status));

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Cases</h1>
          <p className="text-slate-500 text-sm mt-0.5">{open.length} open · {closed.length} closed</p>
        </div>

        {cases.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400">No cases assigned yet.</p>
          </div>
        ) : (
          <>
            {pending.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                  Awaiting Your Response ({pending.length})
                </h2>
                <div className="space-y-2">
                  {pending.map((c) => <CaseRow key={c.id} c={c} highlight />)}
                </div>
              </section>
            )}

            {open.filter(c => !pending.includes(c)).length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Active</h2>
                <div className="space-y-2">
                  {open.filter(c => !pending.includes(c)).map((c) => <CaseRow key={c.id} c={c} />)}
                </div>
              </section>
            )}

            {closed.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Closed</h2>
                <div className="space-y-2 opacity-70">
                  {closed.map((c) => <CaseRow key={c.id} c={c} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}

function CaseRow({ c, highlight }: { c: any; highlight?: boolean }) {
  return (
    <Link href={`/staff/cases/${c.id}`}
      className={`flex items-center justify-between rounded-xl px-5 py-4 border hover:shadow-sm transition group ${highlight ? "bg-yellow-50 border-yellow-200" : "bg-white border-slate-100"}`}>
      <div className="space-y-1 min-w-0">
        <p className="font-medium text-slate-800 text-sm">{c.student?.user?.name ?? "Student"}</p>
        <div className="flex flex-wrap gap-1">
          {c.serviceCategories.slice(0, 2).map((cat: string) => (
            <span key={cat} className="text-xs text-slate-500">{cat.replace(/_/g, " ")}</span>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          {c.student?.institution?.name ?? c.student?.district ?? "—"} ·{" "}
          {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <div className="text-right">
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[c.status] ?? "bg-gray-100 text-gray-600"}`}>
            {c.status.replace(/_/g, " ")}
          </span>
          <p className={`text-xs mt-0.5 ${URGENCY_COLORS[c.urgency] ?? "text-slate-400"}`}>{c.urgency}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
      </div>
    </Link>
  );
}
