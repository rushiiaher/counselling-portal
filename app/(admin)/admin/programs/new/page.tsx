"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { createProgramAction } from "@/app/actions/program.actions";
import { getInstitutionsAction } from "@/app/actions/institution.actions";
import { Feedback } from "@/lib/feedback";

const SERVICE_CATEGORIES = [
  "CAREER_COUNSELLING", "EDUCATIONAL_GUIDANCE", "MENTAL_WELLNESS", "YOUTH_GUIDANCE",
  "SKILL_DEVELOPMENT", "FAMILY_COUNSELLING", "PERSONAL_COUNSELLING", "CRISIS_SUPPORT",
];
const PROGRAM_TYPES = ["SEMINAR", "WORKSHOP", "WEBINAR", "CAMP"];

export default function NewProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", serviceCategory: "CAREER_COUNSELLING",
    programType: "SEMINAR", targetDistrict: "", scheduledDate: "", durationMinutes: 90,
    venue: "", maxParticipants: "", isPublic: true, registrationDeadline: "",
    facilitatorIds: [] as string[], institutionIds: [] as string[],
  });

  useEffect(() => {
    getInstitutionsAction().then((r) => { if (r.success) setInstitutions(r.data ?? []); });
  }, []);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const toggleInstitution = (id: string) => setForm((f) => ({
    ...f, institutionIds: f.institutionIds.includes(id)
      ? f.institutionIds.filter((i) => i !== id)
      : [...f.institutionIds, id],
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createProgramAction({
        ...form,
        serviceCategory: form.serviceCategory as any,
        programType: form.programType as any,
        maxParticipants: form.maxParticipants ? Number(form.maxParticipants) : undefined,
        durationMinutes: Number(form.durationMinutes),
      });
      if (res.success) { Feedback.success("Program created"); router.push("/admin/programs"); }
      else Feedback.error(res.error ?? "Failed");
    } finally { setLoading(false); }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Create Awareness Program</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => set("title", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea required value={form.description} onChange={(e) => set("description", e.target.value)} rows={3}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Service Category *</label>
              <select required value={form.serviceCategory} onChange={(e) => set("serviceCategory", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none">
                {SERVICE_CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Program Type *</label>
              <select required value={form.programType} onChange={(e) => set("programType", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none">
                {PROGRAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date & Time *</label>
              <input required type="datetime-local" value={form.scheduledDate}
                onChange={(e) => set("scheduledDate", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes) *</label>
              <input required type="number" min={15} value={form.durationMinutes}
                onChange={(e) => set("durationMinutes", Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Venue / Platform</label>
              <input value={form.venue} onChange={(e) => set("venue", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Participants</label>
              <input type="number" min={1} value={form.maxParticipants} onChange={(e) => set("maxParticipants", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target District</label>
              <input value={form.targetDistrict} onChange={(e) => set("targetDistrict", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Registration Deadline</label>
              <input type="datetime-local" value={form.registrationDeadline}
                onChange={(e) => set("registrationDeadline", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPublic" checked={form.isPublic}
              onChange={(e) => set("isPublic", e.target.checked)} className="w-4 h-4" />
            <label htmlFor="isPublic" className="text-sm text-slate-700">Visible to students (public registration)</label>
          </div>
          {institutions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Institutions (optional)</label>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                {institutions.map((inst) => (
                  <label key={inst.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 rounded p-1">
                    <input type="checkbox" checked={form.institutionIds.includes(inst.id)}
                      onChange={() => toggleInstitution(inst.id)} className="w-3 h-3" />
                    <span className="text-xs text-slate-700">{inst.name} <span className="text-slate-400">({inst.type})</span></span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
              {loading ? "Creating..." : "Create Program"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
