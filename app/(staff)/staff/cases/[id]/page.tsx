"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import {
  getRequestDetailAction,
  respondToAssignmentAction,
} from "@/app/actions/support-request.actions";
import { Feedback } from "@/lib/feedback";
import { ArrowLeft, CheckCircle2, XCircle, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-700",
  UNDER_REVIEW: "bg-orange-100 text-orange-700",
  COUNSELLOR_ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  FOLLOW_UP_REQUIRED: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  ESCALATED: "bg-red-100 text-red-700",
};

export default function StaffCaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  const load = async () => {
    const res = await getRequestDetailAction(id);
    if (res.success) setRequest(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const myAssignment = request?.assignments?.find(
    (a: any) => a.status === "PENDING_ACCEPTANCE"
  );

  const handleAccept = async () => {
    if (!myAssignment) return;
    setActing(true);
    const res = await respondToAssignmentAction(myAssignment.id, "ACCEPTED");
    if (res.success) { Feedback.success("Assignment accepted"); load(); }
    else Feedback.error(res.error ?? "Failed");
    setActing(false);
  };

  const handleReject = async () => {
    if (!myAssignment || !rejectReason.trim()) return Feedback.error("Please provide a reason");
    setActing(true);
    const res = await respondToAssignmentAction(myAssignment.id, "REJECTED", rejectReason);
    if (res.success) { Feedback.success("Assignment rejected"); router.push("/staff/cases"); }
    else Feedback.error(res.error ?? "Failed");
    setActing(false);
  };

  if (loading) return <PageContainer><div className="p-8 text-slate-400 text-sm">Loading...</div></PageContainer>;
  if (!request) return <PageContainer><div className="p-8 text-red-500 text-sm">Case not found</div></PageContainer>;

  const student = request.student;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft className="w-4 h-4" /> My Cases
        </button>

        {/* Accept / reject banner */}
        {myAssignment && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 space-y-3">
            <p className="font-semibold text-yellow-800">You have been assigned to this case</p>
            <p className="text-sm text-yellow-700">Review the details below and accept or reject this assignment.</p>
            {!showReject ? (
              <div className="flex gap-3">
                <button onClick={handleAccept} disabled={acting}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                  <CheckCircle2 className="w-4 h-4" /> Accept
                </button>
                <button onClick={() => setShowReject(true)} disabled={acting}
                  className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-200">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason for rejection (e.g. conflict of interest, capacity)"
                  rows={2}
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <div className="flex gap-2">
                  <button onClick={handleReject} disabled={acting || !rejectReason.trim()}
                    className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                    Confirm Reject
                  </button>
                  <button onClick={() => { setShowReject(false); setRejectReason(""); }}
                    className="text-sm text-slate-500 hover:text-slate-700 px-2">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Case header */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800">{student?.user?.name ?? "Student"}</h1>
              <p className="text-sm text-slate-500">
                {student?.institution?.name ?? student?.district ?? "—"}
                {student?.grade ? ` · Grade ${student.grade}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${STATUS_COLORS[request.status] ?? "bg-gray-100 text-gray-600"}`}>
                {request.status.replace(/_/g, " ")}
              </span>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700`}>
                {request.urgency}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {request.serviceCategories.map((cat: string) => (
              <span key={cat} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">
                {cat.replace(/_/g, " ")}
              </span>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 mb-1">Student's Description</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 leading-relaxed">{request.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-400">Language</p>
              <p className="text-slate-700">{request.preferredLanguage === "ur" ? "Urdu" : "English"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Submitted</p>
              <p className="text-slate-700">{new Date(request.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!["RESOLVED", "ESCALATED"].includes(request.status) && !myAssignment && (
          <div className="flex gap-3">
            <Link href={`/staff/reports/new/${request.id}`}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
              <FileText className="w-4 h-4" /> Add Guidance Report
            </Link>
          </div>
        )}

        {/* Guidance reports */}
        {request.guidanceReports?.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Guidance Reports</h2>
              <Link href={`/staff/reports?caseId=${request.id}`} className="text-xs text-slate-400 hover:text-slate-600">View all</Link>
            </div>
            <div className="space-y-2">
              {request.guidanceReports.map((g: any) => (
                <div key={g.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                  <div>
                    <p className="text-slate-700">Session {g.sessionNumber ?? "—"}</p>
                    <p className="text-xs text-slate-400">{new Date(g.sessionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
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

        {/* Follow-ups */}
        {request.followUps?.length > 0 && (
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-3">Follow-ups</h2>
            <div className="space-y-2">
              {request.followUps.map((f: any) => (
                <div key={f.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                  <p className="text-slate-700">{new Date(f.scheduledDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    f.status === "COMPLETED" ? "bg-green-50 text-green-700" :
                    f.status === "MISSED" ? "bg-red-50 text-red-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {request.status === "ESCALATED" && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            This case has been escalated.
            {request.escalationReason && <span className="ml-1 text-red-600">Reason: {request.escalationReason}</span>}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
