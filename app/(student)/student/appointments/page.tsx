"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/shared/PageContainer";
import { cancelAppointmentAction } from "@/app/actions/scheduling.actions";
import { Feedback } from "@/lib/feedback";
import { format } from "date-fns";
import { Calendar, Video, MapPin, Clock } from "lucide-react";
import Link from "next/link";

type Appointment = {
  id: string;
  startTime: string;
  endTime: string;
  mode: string;
  status: string;
  counsellorName: string | null;
};

async function fetchAppointments(): Promise<Appointment[]> {
  const res = await fetch("/api/student/appointments");
  if (!res.ok) return [];
  return res.json();
}

const STATUS_STYLES: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-slate-100 text-slate-600",
  CANCELLED: "bg-rose-100 text-rose-700",
  NO_SHOW:   "bg-orange-100 text-orange-700",
};

export default function StudentAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    fetchAppointments().then(data => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const handleCancel = (id: string) => {
    startTransition(async () => {
      const res = await cancelAppointmentAction(id);
      if (res.success) {
        Feedback.success("Appointment cancelled");
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "CANCELLED" } : a));
      } else {
        Feedback.error(res.error || "Failed to cancel");
      }
    });
  };

  const upcoming = appointments.filter(a => ["PENDING", "CONFIRMED"].includes(a.status) && new Date(a.startTime) >= new Date());
  const past = appointments.filter(a => !["PENDING", "CONFIRMED"].includes(a.status) || new Date(a.startTime) < new Date());

  return (
    <PageContainer>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your scheduled counselling sessions.</p>
        </div>
        <Link
          href="/student/counsellors"
          className="text-sm font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          Book New Session
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-16">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-700 text-lg">No appointments yet</h3>
          <p className="text-slate-500 text-sm mt-1 mb-6">Book your first session with a counsellor.</p>
          <Link href="/student/counsellors" className="text-sm font-bold text-blue-600 hover:underline">Browse Counsellors →</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcoming.map(apt => (
                  <div key={apt.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        {apt.mode === "VIDEO" ? <Video className="w-5 h-5 text-blue-600" /> : <MapPin className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{apt.counsellorName || "Counsellor"}</div>
                        <div className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {format(new Date(apt.startTime), "EEEE, MMM d 'at' h:mm a")}
                          {" · "}{apt.mode === "VIDEO" ? "Video Call" : "In-Person"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${STATUS_STYLES[apt.status]}`}>{apt.status}</span>
                      <button
                        onClick={() => handleCancel(apt.id)}
                        disabled={isPending}
                        className="text-xs font-bold text-rose-600 hover:underline disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-4">Past</h2>
              <div className="space-y-3">
                {past.map(apt => (
                  <div key={apt.id} className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex items-center justify-between opacity-75">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                        {apt.mode === "VIDEO" ? <Video className="w-5 h-5 text-slate-400" /> : <MapPin className="w-5 h-5 text-slate-400" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-700">{apt.counsellorName || "Counsellor"}</div>
                        <div className="text-sm text-slate-400 mt-0.5">
                          {format(new Date(apt.startTime), "MMM d, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${STATUS_STYLES[apt.status] || "bg-slate-100 text-slate-600"}`}>{apt.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
