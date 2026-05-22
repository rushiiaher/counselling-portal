import { getInstitutionsAction } from "@/app/actions/institution.actions";
import PageContainer from "@/components/shared/PageContainer";
import Link from "next/link";
import { Building2, Plus, MapPin, Phone, Users } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  SCHOOL: "School", COLLEGE: "College", HOSPITAL: "Hospital",
  WELFARE_DEPT: "Welfare Dept", LAW_ENFORCEMENT: "Law Enforcement",
  ADMINISTRATION: "Administration", NGO: "NGO", OTHER: "Other",
};

const TYPE_COLORS: Record<string, string> = {
  SCHOOL: "bg-blue-100 text-blue-700", COLLEGE: "bg-purple-100 text-purple-700",
  HOSPITAL: "bg-red-100 text-red-700", WELFARE_DEPT: "bg-green-100 text-green-700",
  LAW_ENFORCEMENT: "bg-orange-100 text-orange-700", ADMINISTRATION: "bg-slate-100 text-slate-700",
  NGO: "bg-teal-100 text-teal-700", OTHER: "bg-gray-100 text-gray-700",
};

export default async function AdminInstitutionsPage() {
  const res = await getInstitutionsAction({ isActive: true });
  const institutions = res.data ?? [];

  const byType = institutions.reduce((acc: Record<string, number>, i) => {
    acc[i.type] = (acc[i.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Institution Management</h1>
            <p className="text-slate-500 text-sm mt-1">{institutions.length} active institutions</p>
          </div>
          <Link
            href="/admin/institutions/new"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Institution
          </Link>
        </div>

        {/* Summary row */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(byType).map(([type, count]) => (
            <span key={type} className={`px-3 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[type] ?? "bg-gray-100 text-gray-700"}`}>
              {TYPE_LABELS[type] ?? type}: {count}
            </span>
          ))}
        </div>

        {institutions.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No institutions yet. Add schools, colleges, hospitals, and partner organizations.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutions.map((inst) => (
              <Link
                key={inst.id}
                href={`/admin/institutions/${inst.id}`}
                className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[inst.type] ?? "bg-gray-100 text-gray-700"}`}>
                    {TYPE_LABELS[inst.type] ?? inst.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {(inst as any)._count?.students ?? 0}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 leading-tight">{inst.name}</h3>
                {inst.principalName && (
                  <p className="text-xs text-slate-500 mt-1">{inst.principalName}</p>
                )}
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {inst.district}{inst.area ? `, ${inst.area}` : ""}
                  </p>
                  {inst.contactPhone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {inst.contactPhone}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
