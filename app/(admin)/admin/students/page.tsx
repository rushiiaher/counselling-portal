import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { Users } from "lucide-react";
import Link from "next/link";

export default async function AdminStudentsPage() {
  await requireAuth();

  const students = await prisma.studentProfile.findMany({
    include: {
      user: { select: { name: true, email: true, isActive: true } },
      institution: { select: { name: true, type: true } },
      _count: { select: { supportRequests: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <span className="text-sm text-slate-400 ml-1">{students.length} registered</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Student", "Institution", "District", "Grade", "Requests", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">No students registered yet</td>
                </tr>
              ) : students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-800">{s.user?.name ?? s.firstName ?? "—"}</p>
                    <p className="text-xs text-slate-400">{s.user?.email}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {s.institution ? (
                      <>
                        <p>{s.institution.name}</p>
                        <p className="text-xs text-slate-400">{s.institution.type}</p>
                      </>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-500">{s.district ?? "—"}</td>
                  <td className="px-5 py-3 text-slate-500">{s.grade ?? "—"}</td>
                  <td className="px-5 py-3">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                      {s._count.supportRequests}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {s.user?.isActive ? (
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-xs text-slate-400">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
