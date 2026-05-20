import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess, getAuditLogs } from "@/services/admin.service";
import { format } from "date-fns";
import { ShieldCheck } from "lucide-react";

export default async function AuditLogPage() {
  await verifyAdminAccess();

  // In production, add pagination and search params filtering
  const logs = await getAuditLogs(undefined, 200);

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Audit Infrastructure</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Immutable operational and access logs.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">Timestamp</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">Action</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">Actor</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">Resource</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider">IP Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 font-mono text-xs text-slate-600 transition cursor-default">
                <td className="p-4 text-slate-400">{format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss")}</td>
                <td className="p-4 font-bold text-slate-800">{log.action}</td>
                <td className="p-4 text-blue-600">{log.user?.email || "SYSTEM"}</td>
                <td className="p-4">
                  {log.resourceType ? (
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{log.resourceType}:{log.resourceId}</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-4 text-slate-400">{log.ipHash ? log.ipHash.substring(0, 12) + "..." : "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
