"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { createGuidanceReportAction } from "@/app/actions/guidance.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowLeft } from "lucide-react";

export default function NewGuidanceReportPage() {
  const { caseId } = useParams<{ caseId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    sessionDate: new Date().toISOString().slice(0, 10),
    concerns: "",
    observations: "",
    supportProvided: "",
    recommendations: "",
    followUpRequired: false,
    followUpDate: "",
    escalationRequired: false,
    escalationReason: "",
    referralRequired: false,
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.concerns.trim() || !form.observations.trim()) {
      return Feedback.error("Concerns and observations are required");
    }
    setLoading(true);
    try {
      const res = await createGuidanceReportAction({
        requestId: caseId,
        ...form,
      });
      if (res.success) {
        Feedback.success("Report saved");
        router.push(`/staff/cases/${caseId}`);
      } else {
        Feedback.error(res.error ?? "Failed to save");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Case
        </button>
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Add Guidance Report</h1>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 space-y-5 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Session Date *</label>
            <input type="date" required value={form.sessionDate} onChange={(e) => set("sessionDate", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
          </div>

          {[
            { key: "concerns", label: "Concerns Identified *", placeholder: "Key concerns or issues raised in this session..." },
            { key: "observations", label: "Observations *", placeholder: "Counsellor's observations about the student's state..." },
            { key: "supportProvided", label: "Support Provided", placeholder: "What guidance or support was provided..." },
            { key: "recommendations", label: "Recommendations", placeholder: "Next steps, strategies, or referrals recommended..." },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <textarea value={(form as any)[key]} onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder} rows={3}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" />
            </div>
          ))}

          <div className="border-t pt-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.followUpRequired} onChange={(e) => set("followUpRequired", e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Follow-up required</span>
            </label>
            {form.followUpRequired && (
              <div className="ml-7">
                <label className="block text-xs text-slate-500 mb-1">Follow-up date</label>
                <input type="date" value={form.followUpDate} onChange={(e) => set("followUpDate", e.target.value)}
                  className="px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.referralRequired} onChange={(e) => set("referralRequired", e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Referral to external agency required</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.escalationRequired} onChange={(e) => set("escalationRequired", e.target.checked)} className="w-4 h-4 accent-red-500" />
              <span className="text-sm font-medium text-red-700">Escalate this case (critical / emergency)</span>
            </label>
            {form.escalationRequired && (
              <div className="ml-7">
                <textarea value={form.escalationReason} onChange={(e) => set("escalationReason", e.target.value)}
                  placeholder="Reason for escalation..." rows={2}
                  className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm focus:ring-2 focus:ring-red-400 outline-none resize-none" />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
              {loading ? "Saving..." : "Save Report"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
