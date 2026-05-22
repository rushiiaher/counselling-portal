import { getMyCounsellorReportsAction } from "@/app/actions/guidance.actions";
import PageContainer from "@/components/shared/PageContainer";
import { FileText } from "lucide-react";

export default async function StaffReportsPage() {
  const res = await getMyCounsellorReportsAction();
  const reports = res.data ?? [];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">Guidance Reports</h1>

        {reports.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <FileText className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400">No reports yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r: any) => (
              <div key={r.id} className="bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{r.student?.user?.name ?? "Student"}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Session {r.sessionNumber ?? "—"} ·{" "}
                      {new Date(r.sessionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {r.escalationRequired && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">Escalated</span>
                    )}
                    {r.followUpRequired && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">Follow-up</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      r.studentProgress === "IMPROVING" ? "bg-green-50 text-green-700" :
                      r.studentProgress === "DETERIORATING" ? "bg-red-50 text-red-700" :
                      r.studentProgress === "RESOLVED" ? "bg-green-100 text-green-800" :
                      "bg-slate-50 text-slate-600"
                    }`}>
                      {r.studentProgress?.replace(/_/g, " ") ?? "STABLE"}
                    </span>
                  </div>
                </div>
                {r.recommendations && (
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{r.recommendations}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
