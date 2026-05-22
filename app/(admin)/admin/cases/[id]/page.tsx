"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import {
  getRequestDetailAction,
  getCounsellorsForAssignmentAction,
  assignCounsellorAction,
  updateRequestStatusAction,
} from "@/app/actions/support-request.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowLeft, User, Building2, AlertTriangle, CheckCircle2, UserCheck } from "lucide-react";

const STATUS_STEPS = [
  "SUBMITTED", "UNDER_REVIEW", "COUNSELLOR_ASSIGNED",
  "IN_PROGRESS", "FOLLOW_UP_REQUIRED", "RESOLVED",
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

export default function AdminCaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [counsellors, setCounsellors] = useState<any[]>([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const load = async () => {
    const res = await getRequestDetailAction(id);
    if (res.success && res.data) {
      setRequest(res.data);
      if (res.data.serviceCategories?.length > 0) {
        const cr = await getCounsellorsForAssignmentAction(res.data.serviceCategories as any[]);
        if (cr.success) setCounsellors(cr.data ?? []);
      }
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleAssign = async () => {
    if (!selectedCounsellor) return Feedback.error("Select a counsellor");
    setAssigning(true);
    const res = await assignCounsellorAction(id, selectedCounsellor);
    if (res.success) { Feedback.success("Counsellor assigned"); load(); }
    else Feedback.error(res.error ?? "Failed");
    setAssigning(false);
  };

  const handleResolve = async () => {
    const res = await updateRequestStatusAction(id, "RESOLVED");
    if (res.success) { Feedback.success("Case resolved"); load(); }
    else Feedback.error(res.error ?? "Failed");
  };

  const handleEscalate = async () => {
    const reason = prompt("Escalation reason:");
    if (!reason) return;
    const res = await updateRequestStatusAction(id, "ESCALATED", reason);
    if (res.success) { Feedback.success("Case escalated"); load(); }
    else Feedback.error(res.error ?? "Failed");
  };

  if (loading) return <PageContainer><div className="p-8 text-slate-400">Loading...</div></PageContainer>;
  if (!request) return <PageContainer><div className="p-8 text-red-500">Case not found</div></PageContainer>;

  const student = request.student;
  const currentStep = STATUS_STEPS.indexOf(request.status);

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Cases
        </button>

        {/* Header */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{student?.user?.name ?? "Student"}</h1>
              <p className="text-sm text-slate-500">
                {student?.institution?.name ?? student?.district ?? "—"} · {student?.grade ?? ""}
              </p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${STATUS_COLORS[request.status] ?? "bg-gray-100 text-gray-600"}`}>
                {request.status.replace(/_/g, " ")}
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                {request.urgency}
              </span>
            </div>
          </div>

          {/* Status timeline */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-1 flex-shrink-0">
                <div className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${i <= currentStep ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {step.replace(/_/g, " ")}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`w-4 h-0.5 ${i < currentStep ? "bg-slate-900" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Request details */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Services Requested</p>
              <div className="flex flex-wrap gap-1">
                {request.serviceCategories.map((cat: string) => (
                  <span key={cat} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">
                    {cat.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Preferred Language</p>
              <p className="text-sm text-slate-700">{request.preferredLanguage === "ur" ? "Urdu" : "English"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Student's Description</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{request.description}</p>
          </div>
        </div>

        {/* Assign counsellor */}
        {!["RESOLVED", "ESCALATED"].includes(request.status) && (
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              {request.assignedCounsellor ? "Reassign Counsellor" : "Assign Counsellor"}
            </h2>
            {request.assignedCounsellor && (
              <p className="text-sm text-slate-600 mb-3">
                Currently: <strong>{request.assignedCounsellor.user?.name}</strong>
              </p>
            )}
            <div className="flex gap-3">
              <select
                value={selectedCounsellor}
                onChange={(e) => setSelectedCounsellor(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              >
                <option value="">Select counsellor...</option>
                {counsellors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.user?.name} — {c._count?.assignedRequests} active cases
                    {c.serviceCategories?.length > 0 ? ` — ${c.serviceCategories.map((s: string) => s.replace(/_/g, " ")).join(", ")}` : ""}
                  </option>
                ))}
              </select>
              <button onClick={handleAssign} disabled={assigning || !selectedCounsellor}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50">
                {assigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        )}

        {/* Assignment history */}
        {request.assignments?.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4">Assignment History</h2>
            <div className="space-y-2">
              {request.assignments.map((a: any) => (
                <div key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="font-medium text-slate-700">{a.counsellor?.user?.name}</p>
                    {a.rejectionReason && <p className="text-xs text-red-500">Rejected: {a.rejectionReason}</p>}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    a.status === "ACCEPTED" ? "bg-green-100 text-green-700" :
                    a.status === "REJECTED" ? "bg-red-100 text-red-700" :
                    a.status === "REASSIGNED" ? "bg-gray-100 text-gray-600" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{a.status.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {!["RESOLVED", "ESCALATED"].includes(request.status) && (
          <div className="flex gap-3">
            <button onClick={handleResolve}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700">
              <CheckCircle2 className="w-4 h-4" /> Mark Resolved
            </button>
            <button onClick={handleEscalate}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700">
              <AlertTriangle className="w-4 h-4" /> Escalate Case
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
