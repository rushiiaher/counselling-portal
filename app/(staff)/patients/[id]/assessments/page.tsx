import React, { use } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import { verifyClinicalAccess } from "@/services/clinical.service";
import { format } from "date-fns";
import { Activity, AlertTriangle } from "lucide-react";
import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function PatientAssessmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  const { id } = await params;
  
  // Enforce access control immediately
  await verifyClinicalAccess(session.id, id);

  const assessments = await prisma.assessmentResult.findMany({
    where: { patientId: id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Clinical Assessments</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Activity className="w-3.5 h-3.5" /> Longitudinal Health Tracking
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Link href={`/staff/patients/${id}`} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition px-3 py-1.5 bg-slate-100 rounded-lg">&larr; Back to Workspace</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {assessments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 italic">No assessments completed by this patient yet.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Score</th>
                <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Severity</th>
                <th className="p-5 text-xs font-extrabold text-slate-500 uppercase tracking-widest">Crisis Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition cursor-default">
                  <td className="p-5 text-sm font-medium text-slate-800">{format(new Date(a.createdAt), "MMM d, yyyy")}</td>
                  <td className="p-5 text-sm font-bold text-slate-600">{a.assessmentType}</td>
                  <td className="p-5 text-sm font-mono font-extrabold text-slate-900">{a.score}</td>
                  <td className="p-5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      a.severity === 'SEVERE' || a.severity === 'MODERATELY_SEVERE' ? 'bg-rose-100 text-rose-800' :
                      a.severity === 'MODERATE' ? 'bg-orange-100 text-orange-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {a.severity.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-5">
                    {a.triggeredCrisis ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md w-fit">
                        <AlertTriangle className="w-3.5 h-3.5" /> Flagged
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">None</span>
                    )}
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
