"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { toggleUserActiveAction, toggleCounsellorVerifiedAction } from "@/app/actions/admin.actions";
import { Feedback } from "@/lib/feedback";

type CounsellorRow = {
  id: string;
  userId: string;
  name: string | null;
  email: string | null;
  isActive: boolean;
  isVerified: boolean;
  assignedPatients: number;
};

export default function AdminStaffTable({ counsellors: initial }: { counsellors: CounsellorRow[] }) {
  const [rows, setRows] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const toggleActive = (userId: string, current: boolean) => {
    startTransition(async () => {
      const res = await toggleUserActiveAction(userId, !current);
      if (res.success) {
        setRows(prev => prev.map(r => r.userId === userId ? { ...r, isActive: !current } : r));
        Feedback.success(!current ? "User activated" : "User deactivated");
      } else {
        Feedback.error(res.error || "Failed");
      }
    });
  };

  const toggleVerified = (id: string, current: boolean) => {
    startTransition(async () => {
      const res = await toggleCounsellorVerifiedAction(id, !current);
      if (res.success) {
        setRows(prev => prev.map(r => r.id === id ? { ...r, isVerified: !current } : r));
        Feedback.success(!current ? "Counsellor verified" : "Verification revoked");
      } else {
        Feedback.error(res.error || "Failed");
      }
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Counsellor</th>
            <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Status</th>
            <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Verified</th>
            <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Active Cases</th>
            <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(c => (
            <tr key={c.id} className="hover:bg-slate-50 transition">
              <td className="p-5">
                <div className="font-bold text-slate-800">{c.name || "—"}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">{c.email}</div>
              </td>
              <td className="p-5">
                {c.isActive ? (
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">Active</span>
                ) : (
                  <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded-md">Deactivated</span>
                )}
              </td>
              <td className="p-5">
                {c.isVerified ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </td>
              <td className="p-5 text-sm font-medium text-slate-700">
                <span className="bg-slate-100 px-3 py-1 rounded font-bold text-slate-800">{c.assignedPatients}</span> cases
              </td>
              <td className="p-5 flex items-center gap-3">
                <button
                  onClick={() => toggleVerified(c.id, c.isVerified)}
                  disabled={isPending}
                  className="text-xs font-bold text-blue-600 hover:underline disabled:opacity-50"
                >
                  {c.isVerified ? "Revoke Verification" : "Verify"}
                </button>
                <button
                  onClick={() => toggleActive(c.userId, c.isActive)}
                  disabled={isPending}
                  className={`text-xs font-bold hover:underline disabled:opacity-50 ${c.isActive ? "text-rose-600" : "text-emerald-600"}`}
                >
                  {c.isActive ? "Deactivate" : "Reactivate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
