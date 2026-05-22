"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { getRequestDetailAction } from "@/app/actions/support-request.actions";
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const STATUS_STEPS = [
  { key: "SUBMITTED", label: "Submitted" },
  { key: "UNDER_REVIEW", label: "Under Review" },
  { key: "COUNSELLOR_ASSIGNED", label: "Counsellor Assigned" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "FOLLOW_UP_REQUIRED", label: "Follow-up" },
  { key: "RESOLVED", label: "Resolved" },
];

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-orange-100 text-orange-700",
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
  SESSION_SCHEDULED: "bg-indigo-100 text-indigo-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  FOLLOW_UP_REQUIRED: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  ESCALATED: "bg-red-100 text-red-700",
};

const URGENCY_LABELS: Record<string, string> = {
  LOW: "Not urgent",
  MEDIUM: "Somewhat urgent",
  HIGH: "Urgent",
  CRITICAL: "Crisis — needs immediate help",
};

export default function StudentRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequestDetailAction(id).then((res) => {
      if (res.success) setRequest(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <PageContainer><div className="p-8 text-slate-400 text-sm">Loading...</div></PageContainer>;
  if (!request) return <PageContainer><div className="p-8 text-red-500 text-sm">Request not found</div></PageContainer>;

  const isEscalated = request.status === "ESCALATED";
  const isResolved = request.status === "RESOLVED";
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === request.status);
  const effectiveStep = isEscalated ? -1 : currentStepIndex;

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> My Requests
        </button>

        {/* Status header */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-400 mb-1">
                Submitted {new Date(request.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <div className="flex flex-wrap gap-1">
                {request.serviceCategories.map((cat: string) => (
                  <span key={cat} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                    {cat.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>
            <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${STATUS_COLORS[request.status] ?? "bg-gray-100 text-gray-600"}`}>
              {request.status.replace(/_/g, " ")}
            </span>
          </div>

          {/* Timeline */}
          {!isEscalated ? (
            <div className="pt-2">
              <div className="flex items-center gap-0">
                {STATUS_STEPS.map((step, i) => {
                  const done = i < effectiveStep;
                  const active = i === effectiveStep;
                  const last = i === STATUS_STEPS.length - 1;
                  return (
                    <div key={step.key} className="flex items-center flex-1 min-w-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-green-500" : active ? "bg-slate-900" : "bg-slate-100"}`}>
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          ) : active ? (
                            <Clock className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                          )}
                        </div>
                        <p className={`text-center mt-1 leading-tight ${active ? "text-slate-800 font-medium" : done ? "text-slate-500" : "text-slate-300"}`}
                          style={{ fontSize: "9px", maxWidth: "52px" }}>
                          {step.label}
                        </p>
                      </div>
                      {!last && (
                        <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < effectiveStep ? "bg-green-400" : "bg-slate-100"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <p>This case has been escalated for higher-level support. Our team will contact you shortly.</p>
            </div>
          )}
        </div>

        {/* Counsellor */}
        {request.assignedCounsellor && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-2">Your Counsellor</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600">
                {request.assignedCounsellor.user?.name?.[0] ?? "C"}
              </div>
              <div>
                <p className="font-medium text-slate-800 text-sm">{request.assignedCounsellor.user?.name}</p>
                {request.assignedCounsellor.designation && (
                  <p className="text-xs text-slate-400">{request.assignedCounsellor.designation}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Request details */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-800">Your Request</h2>
          <div>
            <p className="text-xs font-medium text-slate-400 mb-1">What you shared</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 leading-relaxed">{request.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Urgency</p>
              <p className="text-sm text-slate-700">{URGENCY_LABELS[request.urgency] ?? request.urgency}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Language</p>
              <p className="text-sm text-slate-700">{request.preferredLanguage === "ur" ? "Urdu" : "English"}</p>
            </div>
          </div>
        </div>

        {/* Guidance reports summary */}
        {request.guidanceReports?.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-3">
              {request.guidanceReports.length} session{request.guidanceReports.length > 1 ? "s" : ""} recorded
            </p>
            <div className="space-y-2">
              {request.guidanceReports.map((g: any) => (
                <div key={g.id} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-50 last:border-0">
                  <p className="text-slate-600">
                    {new Date(g.sessionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    {g.sessionNumber ? ` · Session ${g.sessionNumber}` : ""}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    g.studentProgress === "IMPROVING" ? "bg-green-50 text-green-700" :
                    g.studentProgress === "DETERIORATING" ? "bg-red-50 text-red-700" :
                    "bg-slate-50 text-slate-600"
                  }`}>
                    {g.studentProgress?.replace(/_/g, " ") ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isResolved && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Case Resolved</p>
              <p className="text-xs text-green-600 mt-0.5">Your case has been resolved. You can submit a new request if you need further support.</p>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
