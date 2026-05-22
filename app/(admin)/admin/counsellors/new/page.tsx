"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { createCounsellorAction } from "@/app/actions/counsellor.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const SERVICE_CATEGORIES = [
  "CAREER_COUNSELLING", "EDUCATIONAL_GUIDANCE", "MENTAL_WELLNESS", "YOUTH_GUIDANCE",
  "SKILL_DEVELOPMENT", "FAMILY_COUNSELLING", "PERSONAL_COUNSELLING", "CRISIS_SUPPORT",
];

const LANGUAGES = ["English", "Urdu", "Punjabi", "Sindhi", "Pashto", "Balochi"];

export default function NewCounsellorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    yearsOfExperience: "",
    languages: [] as string[],
    serviceCategories: [] as string[],
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const toggleList = (key: "languages" | "serviceCategories", val: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      return Feedback.error("Name, email, and password are required");
    }
    if (form.password.length < 8) return Feedback.error("Password must be at least 8 characters");
    setLoading(true);
    try {
      const res = await createCounsellorAction({
        ...form,
        yearsOfExperience: form.yearsOfExperience ? Number(form.yearsOfExperience) : undefined,
      });
      if (res.success) {
        Feedback.success("Counsellor account created");
        router.push("/admin/counsellors");
      } else {
        Feedback.error(res.error ?? "Failed to create");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Counsellors
        </button>
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Add Counsellor</h1>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 space-y-5 shadow-sm">
          {/* Account */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="Dr. Ayesha Khan"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                placeholder="ayesha@example.com"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <input required type={showPw ? "text" : "password"} value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Min 8 characters"
                className="w-full px-3 py-2 pr-10 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">Counsellor can change this after first login.</p>
          </div>

          {/* Profile */}
          <div className="border-t pt-4 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Profile</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
              <input type="number" min={0} max={50} value={form.yearsOfExperience}
                onChange={(e) => set("yearsOfExperience", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Description</label>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)}
              placeholder="Brief professional background..." rows={3}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none resize-none" />
          </div>

          {/* Languages */}
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

          {/* Service Categories */}
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

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
              {loading ? "Creating..." : "Create Counsellor"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
