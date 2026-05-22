import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, CheckCircle2, XCircle, Users } from "lucide-react";
import CounsellorRowActions from "./CounsellorRowActions";

const SERVICE_COLORS: Record<string, string> = {
  CAREER_COUNSELLING: "bg-blue-50 text-blue-700",
  EDUCATIONAL_GUIDANCE: "bg-indigo-50 text-indigo-700",
  MENTAL_WELLNESS: "bg-green-50 text-green-700",
  YOUTH_GUIDANCE: "bg-yellow-50 text-yellow-700",
  SKILL_DEVELOPMENT: "bg-purple-50 text-purple-700",
  FAMILY_COUNSELLING: "bg-orange-50 text-orange-700",
  PERSONAL_COUNSELLING: "bg-pink-50 text-pink-700",
  CRISIS_SUPPORT: "bg-red-50 text-red-700",
};

export default async function AdminCounsellorsPage() {
  await verifyAdminAccess();

  const counsellors = await prisma.counsellorProfile.findMany({
    where: { deletedAt: null },
    include: {
      user: { select: { id: true, name: true, email: true, isActive: true } },
      _count: {
        select: {
          assignedRequests: { where: { status: { notIn: ["RESOLVED", "ESCALATED"] } } },
          guidanceReports: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const verified = counsellors.filter((c) => c.isVerified).length;
  const unverified = counsellors.filter((c) => !c.isVerified).length;

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Counsellors</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {counsellors.length} total · {verified} verified · {unverified} pending
            </p>
          </div>
          <Link href="/admin/counsellors/new"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
            <Plus className="w-4 h-4" /> Add Counsellor
          </Link>
        </div>

        {/* Table */}
        {counsellors.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Users className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400">No counsellors yet.</p>
            <Link href="/admin/counsellors/new"
              className="inline-block bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
              Add First Counsellor
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Counsellor", "Specialisations", "Cases", "Reports", "Verified", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {counsellors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <Link href={`/admin/counsellors/${c.id}`} className="group">
                        <p className="font-semibold text-slate-800 group-hover:text-slate-900">{c.user.name ?? "—"}</p>
                        <p className="text-xs text-slate-400">{c.user.email}</p>
                        {c.yearsOfExperience != null && (
                          <p className="text-xs text-slate-400">{c.yearsOfExperience} yr exp</p>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.serviceCategories.length > 0 ? c.serviceCategories.slice(0, 3).map((s) => (
                          <span key={s} className={`text-xs px-1.5 py-0.5 rounded font-medium ${SERVICE_COLORS[s] ?? "bg-slate-100 text-slate-600"}`}>
                            {s.replace(/_/g, " ")}
                          </span>
                        )) : <span className="text-xs text-slate-400">None set</span>}
                        {c.serviceCategories.length > 3 && (
                          <span className="text-xs text-slate-400">+{c.serviceCategories.length - 3}</span>
                        )}
                      </div>
                      {c.languages.length > 0 && (
                        <p className="text-xs text-slate-400 mt-1">{c.languages.join(", ")}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${c._count.assignedRequests >= 12 ? "text-red-600" : c._count.assignedRequests >= 8 ? "text-orange-500" : "text-slate-700"}`}>
                        {c._count.assignedRequests}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{c._count.guidanceReports}</td>
                    <td className="px-4 py-3">
                      {c.isVerified
                        ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                        : <XCircle className="w-4 h-4 text-slate-300" />}
                    </td>
                    <td className="px-4 py-3">
                      {c.user.isActive
                        ? <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">Active</span>
                        : <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-medium">Inactive</span>}
                    </td>
                    <td className="px-4 py-3">
                      <CounsellorRowActions
                        counsellorId={c.id}
                        userId={c.user.id}
                        isVerified={c.isVerified}
                        isActive={c.user.isActive}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
