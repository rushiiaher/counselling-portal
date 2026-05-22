import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { Users, CheckCircle, XCircle } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminUsersPage() {
  await verifyAdminAccess();

  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      profileCompleted: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">User Management</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Users className="w-4 h-4 text-blue-500" /> {users.length} registered users.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">User</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Role</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Profile</th>
              <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition">
                <td className="p-5">
                  <div className="font-bold text-slate-800">{u.name || "—"}</div>
                  <div className="text-xs text-slate-500 font-mono mt-1">{u.email}</div>
                </td>
                <td className="p-5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    u.role === "ADMIN" ? "bg-purple-100 text-purple-800" :
                    u.role === "COUNSELLOR" ? "bg-blue-100 text-blue-800" :
                    u.role === "PARENT" ? "bg-amber-100 text-amber-800" :
                    "bg-slate-100 text-slate-700"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-5">
                  {u.isActive ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                      <XCircle className="w-4 h-4" /> Deactivated
                    </span>
                  )}
                </td>
                <td className="p-5 text-sm text-slate-600">
                  {u.profileCompleted ? (
                    <span className="text-emerald-600 font-bold">Complete</span>
                  ) : (
                    <span className="text-amber-600 font-bold">Incomplete</span>
                  )}
                </td>
                <td className="p-5 text-xs text-slate-500 font-mono">
                  {u.createdAt.toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
