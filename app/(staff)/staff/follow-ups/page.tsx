"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { getMyFollowUpsAction, completeFollowUpAction } from "@/app/actions/guidance.actions";
import { Feedback } from "@/lib/feedback";
import { CheckCircle2, AlertTriangle, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function StaffFollowUpsPage() {
  const [data, setData] = useState<any>({ overdue: [], today: [], thisWeek: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);

  const load = async () => {
    const res = await getMyFollowUpsAction();
    if (res.success) setData(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleComplete = async (id: string) => {
    setCompleting(id);
    const res = await completeFollowUpAction(id, {
      progressNote: "Follow-up completed",
      studentProgress: "STABLE" as any,
      nextFollowUpRequired: false,
    });
    if (res.success) { Feedback.success("Marked complete"); load(); }
    else Feedback.error(res.error ?? "Failed");
    setCompleting(null);
  };

  const Section = ({ title, items, color }: { title: string; items: any[]; color: string }) => {
    if (items.length === 0) return null;
    return (
      <section className="space-y-2">
        <h2 className={`text-sm font-semibold uppercase tracking-wide ${color}`}>{title} ({items.length})</h2>
        <div className="space-y-2">
          {items.map((f) => (
            <div key={f.id} className="bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <p className="font-medium text-slate-800 text-sm">
                  <Link href={`/staff/cases/${f.request?.id}`} className="hover:underline">
                    {(f as any).request?.student?.user?.name ?? "Student"}
                  </Link>
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(f.scheduledDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                  {f.notes ? ` · ${f.notes.slice(0, 60)}` : ""}
                </p>
              </div>
              {f.status === "PENDING" && (
                <button
                  disabled={completing === f.id}
                  onClick={() => handleComplete(f.id)}
                  className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-50 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {completing === f.id ? "..." : "Done"}
                </button>
              )}
              {f.status === "COMPLETED" && (
                <span className="text-xs text-green-600 font-medium flex-shrink-0">Completed</span>
              )}
              {f.status === "MISSED" && (
                <span className="text-xs text-red-500 font-medium flex-shrink-0">Missed</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const total = data.overdue.length + data.today.length + data.thisWeek.length + data.upcoming.length;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Follow-ups</h1>
          <p className="text-slate-500 text-sm mt-0.5">{total} scheduled</p>
        </div>

        {loading ? (
          <div className="text-slate-400 text-sm py-8">Loading...</div>
        ) : total === 0 ? (
          <div className="text-center py-16 space-y-2">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400">No follow-ups scheduled.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Section title="Overdue" items={data.overdue} color="text-red-600" />
            <Section title="Today" items={data.today} color="text-orange-600" />
            <Section title="This Week" items={data.thisWeek} color="text-yellow-700" />
            <Section title="Upcoming" items={data.upcoming} color="text-slate-500" />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
