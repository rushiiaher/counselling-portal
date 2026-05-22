"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { getCounsellorDetailAction, updateCounsellorProfileAction } from "@/app/actions/counsellor.actions";
import { toggleUserActiveAction, toggleCounsellorVerifiedAction } from "@/app/actions/admin.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowLeft, CheckCircle2, XCircle, ClipboardList, FileText } from "lucide-react";

const SERVICE_CATEGORIES = [
  "CAREER_COUNSELLING", "EDUCATIONAL_GUIDANCE", "MENTAL_WELLNESS", "YOUTH_GUIDANCE",
  "SKILL_DEVELOPMENT", "FAMILY_COUNSELLING", "PERSONAL_COUNSELLING", "CRISIS_SUPPORT",
];
const LANGUAGES = ["English", "Urdu", "Punjabi", "Sindhi", "Pashto", "Balochi"];

export default function CounsellorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>(null);

  const load = async () => {
    const res = await getCounsellorDetailAction(id);
    if (res.success && res.data) {
      setData(res.data);
      setForm({
        bio: res.data.bio ?? "",
        languages: res.data.languages ?? [],
        serviceCategories: res.data.serviceCategories ?? [],
        yearsOfExperience: res.data.yearsOfExperience ?? "",
        acceptingPatients: res.data.acceptingPatients,
        isVerified: res.data.isVerified,
      });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const toggleList = (key: "languages" | "serviceCategories", val: string) => {
    setForm((f: any) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x: string) => x !== val) : [...f[key], val],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await updateCounsellorProfileAction(id, {
      ...form,
      yearsOfExperience: form.yearsOfExperience ? Number(form.yearsOfExperience) : undefined,
    });
    if (res.success) { Feedback.success("Profile updated"); load(); }
    else Feedback.error(res.error ?? "Failed");
    setSaving(false);
  };

  const handleToggleVerify = async () => {
    const res = await toggleCounsellorVerifiedAction(id, !data.isVerified);
    if (res.success) { Feedback.success(data.isVerified ? "Verification revoked" : "Verified"); load(); }
    else Feedback.error(res.error ?? "Failed");
  };

  const handleToggleActive = async () => {
    const res = await toggleUserActiveAction(data.user.id, !data.user.isActive);
    if (res.success) { Feedback.success(data.user.isActive ? "Deactivated" : "Activated"); load(); }
    else Feedback.error(res.error ?? "Failed");
  };

  if (loading) return <PageContainer><div className="p-8 text-slate-400 text-sm">Loading...</div></PageContainer>;
  if (!data || !form) return <PageContainer><div className="p-8 text-red-500 text-sm">Not found</div></PageContainer>;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> Counsellors
        </button>

        {/* Header */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{data.user.name}</h1>
              <p className="text-sm text-slate-400">{data.user.email}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Joined {new Date(data.user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${data.isVerified ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                {data.isVerified ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {data.isVerified ? "Verified" : "Unverified"}
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${data.user.isActive ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                {data.user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
              <ClipboardList className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-lg font-bold text-slate-800">{data._count.assignedRequests}</p>
                <p className="text-xs text-slate-500">Active cases</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
              <FileText className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-lg font-bold text-slate-800">{data._count.guidanceReports}</p>
                <p className="text-xs text-slate-500">Reports written</p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <button onClick={handleToggleVerify}
              className={`text-sm px-4 py-1.5 rounded-lg font-medium transition ${data.isVerified ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-green-600 text-white hover:bg-green-700"}`}>
              {data.isVerified ? "Revoke Verification" : "Verify Counsellor"}
            </button>
            <button onClick={handleToggleActive}
              className={`text-sm px-4 py-1.5 rounded-lg font-medium transition ${data.user.isActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
              {data.user.isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>

        {/* Edit profile */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-slate-800">Profile Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
              <input type="number" min={0} max={50} value={form.yearsOfExperience}
                onChange={(e) => set("yearsOfExperience", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.acceptingPatients}
                  onChange={(e) => set("acceptingPatients", e.target.checked)}
                  className="w-4 h-4 accent-slate-900" />
                <span className="text-sm text-slate-700 font-medium">Accepting new cases</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)}
              rows={3} placeholder="Professional background, approach..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button key={lang} type="button" onClick={() => toggleList("languages", lang)}
                  className={`px-3 py-1 rounded-lg border text-xs font-medium transition ${form.languages.includes(lang) ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}>
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Specialisations</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <label key={cat} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition ${form.serviceCategories.includes(cat) ? "border-slate-900 bg-slate-50" : "border-slate-100 hover:border-slate-300"}`}>
                  <input type="checkbox" className="w-3.5 h-3.5 accent-slate-900"
                    checked={form.serviceCategories.includes(cat)}
                    onChange={() => toggleList("serviceCategories", cat)} />
                  <span className="text-xs text-slate-700">{cat.replace(/_/g, " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
