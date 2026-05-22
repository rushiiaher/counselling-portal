"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { getInstitutionAction, updateInstitutionAction, toggleInstitutionActiveAction } from "@/app/actions/institution.actions";
import { Feedback } from "@/lib/feedback";
import { Building2, MapPin, Phone, Mail, Users, ArrowLeft } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  SCHOOL: "School", COLLEGE: "College", HOSPITAL: "Hospital",
  WELFARE_DEPT: "Welfare Dept", LAW_ENFORCEMENT: "Law Enforcement",
  ADMINISTRATION: "Administration", NGO: "NGO", OTHER: "Other",
};

export default function InstitutionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [inst, setInst] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    getInstitutionAction(id).then((r) => {
      if (r.success) { setInst(r.data); setForm(r.data); }
      setLoading(false);
    });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const res = await updateInstitutionAction(id, form);
    if (res.success) { Feedback.success("Updated"); setInst(form); setEditing(false); }
    else Feedback.error(res.error ?? "Failed");
    setSaving(false);
  };

  const handleToggleActive = async () => {
    const res = await toggleInstitutionActiveAction(id, !inst.isActive);
    if (res.success) { setInst((p: any) => ({ ...p, isActive: !p.isActive })); Feedback.success("Updated"); }
    else Feedback.error(res.error ?? "Failed");
  };

  if (loading) return <PageContainer><div className="p-8 text-slate-400">Loading...</div></PageContainer>;
  if (!inst) return <PageContainer><div className="p-8 text-red-500">Institution not found</div></PageContainer>;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{inst.name}</h1>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  {TYPE_LABELS[inst.type] ?? inst.type}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleActive}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${inst.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
              >
                {inst.isActive ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => setEditing(!editing)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Students", value: inst._count?.students ?? 0, icon: Users },
              { label: "Referrals", value: inst._count?.supportReferrals ?? 0, icon: Building2 },
              { label: "Programs", value: inst._count?.programs ?? 0, icon: Building2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          {editing ? (
            <div className="space-y-3">
              {[
                { key: "name", label: "Name" },
                { key: "district", label: "District" },
                { key: "area", label: "Area" },
                { key: "principalName", label: "Principal / Head" },
                { key: "contactPerson", label: "Contact Person" },
                { key: "contactPhone", label: "Contact Phone" },
                { key: "contactEmail", label: "Contact Email" },
                { key: "address", label: "Address" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                  <input
                    value={form[key] ?? ""}
                    onChange={(e) => setForm((f: any) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                  />
                </div>
              ))}
              <button onClick={handleSave} disabled={saving}
                className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-60">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-600"><MapPin className="w-4 h-4" /> {inst.district}{inst.area ? `, ${inst.area}` : ""}</p>
              {inst.principalName && <p className="text-slate-600">Head: {inst.principalName}</p>}
              {inst.contactPerson && <p className="text-slate-600">Contact: {inst.contactPerson}</p>}
              {inst.contactPhone && <p className="flex items-center gap-2 text-slate-600"><Phone className="w-4 h-4" />{inst.contactPhone}</p>}
              {inst.contactEmail && <p className="flex items-center gap-2 text-slate-600"><Mail className="w-4 h-4" />{inst.contactEmail}</p>}
              {inst.address && <p className="text-slate-500 text-xs">{inst.address}</p>}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
