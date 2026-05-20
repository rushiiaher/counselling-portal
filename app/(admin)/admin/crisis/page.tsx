import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { format } from "date-fns";
import { ShieldAlert, AlertTriangle } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function AdminCrisisConsole() {
  await verifyAdminAccess();

  const escalatedCases = await prisma.anonymousSession.findMany({
    where: { status: "ESCALATED", crisisSeverity: { in: ["HIGH", "CRITICAL"] } },
    orderBy: { lastActivityAt: "desc" },
    include: { counsellor: { select: { user: { select: { name: true } } } } }
  });

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Crisis Operations Console</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <ShieldAlert className="w-4 h-4 text-rose-500" /> High-priority unresolved escalations.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {escalatedCases.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-bold text-slate-700">No Active Crises</h3>
            <p className="text-slate-500 text-sm mt-1">All escalated cases have been resolved or closed.</p>
          </div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-rose-50 border-b border-rose-100">
              <tr>
                <th className="p-5 text-xs font-extrabold text-rose-800 uppercase tracking-widest">Severity</th>
                <th className="p-5 text-xs font-extrabold text-rose-800 uppercase tracking-widest">Last Activity</th>
                <th className="p-5 text-xs font-extrabold text-rose-800 uppercase tracking-widest">Topic / Language</th>
                <th className="p-5 text-xs font-extrabold text-rose-800 uppercase tracking-widest">Counsellor</th>
                <th className="p-5 text-xs font-extrabold text-rose-800 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {escalatedCases.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-5">
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md w-fit shadow-sm ${
                      c.crisisSeverity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      <AlertTriangle className="w-3.5 h-3.5" /> {c.crisisSeverity}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-800">{format(new Date(c.lastActivityAt), "MMM d, HH:mm")}</td>
                  <td className="p-5 text-sm text-slate-600 font-medium">{c.topic || "Unknown"} <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded ml-2 uppercase font-bold tracking-wider">{c.language}</span></td>
                  <td className="p-5 text-sm font-bold text-slate-700">{c.counsellor?.user?.name || "Unassigned"}</td>
                  <td className="p-5">
                    <form action={async () => {
                      "use server";
                      const { createAuditLog } = await import("@/services/audit.service");
                      const { requireAuth } = await import("@/lib/auth/session");
                      const session = await requireAuth();
                      await createAuditLog({ userId: session.id, action: "SENSITIVE_RECORD_VIEWED", resourceType: "AnonymousSession", resourceId: c.id });
                    }}>
                      <button type="submit" className="text-xs font-bold text-blue-600 hover:underline">View Transcript</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageContainer>
  );
}
