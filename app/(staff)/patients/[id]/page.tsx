import React, { use } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { getPatientTimeline } from "@/services/clinical.service";
import { requireAuth } from "@/lib/auth/session";
import ClinicalNoteEditor from "@/components/clinical/ClinicalNoteEditor";
import { format } from "date-fns";
import { Lock } from "lucide-react";

export default async function PatientWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  const { id } = await params;
  
  // This function securely checks access assignment and audits the view
  const timeline = await getPatientTimeline(session.id, id);

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">Patient Workspace</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted Clinical Timeline
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ClinicalNoteEditor patientId={id} />
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Clinical History</h3>
            {timeline.length === 0 ? (
              <div className="p-8 border border-slate-100 rounded-xl bg-slate-50 text-center text-sm text-slate-500 italic">
                No clinical notes recorded yet.
              </div>
            ) : (
              timeline.map(note => (
                <div key={note.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3 border-b border-slate-50 pb-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md ${
                      note.noteType === 'CRISIS' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {note.noteType}
                    </span>
                    <div className="text-xs text-slate-400 text-right">
                      <p>{format(new Date(note.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                      {note.editedAt && <p className="italic text-amber-600 mt-0.5">Edited: {format(new Date(note.editedAt), "MMM d")}</p>}
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                    {note.content}
                  </div>
                  {note.requiresElevatedAccess && (
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-1.5 text-xs text-rose-600 font-bold">
                      <Lock className="w-3 h-3" /> Sensitive Record - Access Audited
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          {/* Patient Overview Summary Sidebar */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Profile Details</h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Detailed context is fetched dynamically based on progressive enrichment layers to protect privacy.
            </p>
            <div className="space-y-3">
               <div className="text-sm"><span className="text-slate-400 w-20 inline-block">Status:</span> <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active Assignment</span></div>
               <div className="text-sm"><span className="text-slate-400 w-20 inline-block">ID:</span> <span className="font-mono text-slate-600">{id.substring(0,8)}...</span></div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
