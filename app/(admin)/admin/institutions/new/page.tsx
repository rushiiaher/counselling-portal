"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { createInstitutionAction } from "@/app/actions/institution.actions";
import { Feedback } from "@/lib/feedback";

const INSTITUTION_TYPES = [
  { value: "SCHOOL", label: "School" },
  { value: "COLLEGE", label: "College" },
  { value: "HOSPITAL", label: "Hospital" },
  { value: "WELFARE_DEPT", label: "Welfare Department" },
  { value: "LAW_ENFORCEMENT", label: "Law Enforcement" },
  { value: "ADMINISTRATION", label: "Administration" },
  { value: "NGO", label: "NGO" },
  { value: "OTHER", label: "Other" },
];

export default function NewInstitutionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "SCHOOL", district: "", area: "", address: "",
    contactPerson: "", contactPhone: "", contactEmail: "", principalName: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createInstitutionAction(form as any);
      if (res.success) {
        Feedback.success("Institution added");
        router.push("/admin/institutions");
      } else {
        Feedback.error(res.error ?? "Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Add Institution</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name *</label>
              <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
              <select required value={form.type} onChange={(e) => set("type", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm">
                {INSTITUTION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">District *</label>
              <input required value={form.district} onChange={(e) => set("district", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Area / Block</label>
              <input value={form.area} onChange={(e) => set("area", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Principal / Head Name</label>
              <input value={form.principalName} onChange={(e) => set("principalName", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
              <input value={form.contactPerson} onChange={(e) => set("contactPerson", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
              <input value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-sm resize-none" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 px-4 py-2 border rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
              {loading ? "Saving..." : "Add Institution"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
