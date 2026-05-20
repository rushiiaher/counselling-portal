import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import { AlertTriangle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import prisma from "@/lib/prisma";

export default async function CounsellorInboxPage() {
  const session = await requireAuth();
  if (session.role !== "COUNSELLOR" && session.role !== "ADMIN") return <div>Unauthorized</div>;

  const activeChats = await prisma.anonymousSession.findMany({
    where: { status: { in: ["OPEN", "ESCALATED"] } },
    orderBy: [
      { crisisSeverity: "desc" }, // Sort critical first for triage
      { lastActivityAt: "desc" }
    ],
    take: 50,
  });

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Chat Inbox</h1>
        <p className="text-slate-500 text-sm mt-1">Manage active anonymous sessions and crisis escalations.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {activeChats.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No active sessions right now.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {activeChats.map(chat => (
              <Link key={chat.id} href={`/staff/inbox/${chat.id}`} className="block p-4 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      chat.crisisSeverity === "CRITICAL" || chat.crisisSeverity === "HIGH" 
                        ? "bg-rose-100 text-rose-600" 
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {chat.crisisSeverity === "CRITICAL" || chat.crisisSeverity === "HIGH" ? <AlertTriangle className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        Anonymous User
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-bold uppercase tracking-wider">{chat.language}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {chat.status} • Last active {formatDistanceToNow(new Date(chat.lastActivityAt))} ago
                      </p>
                    </div>
                  </div>
                  <div>
                    {chat.crisisSeverity !== "LOW" && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        chat.crisisSeverity === "CRITICAL" ? "bg-rose-600 text-white shadow-sm" : 
                        chat.crisisSeverity === "HIGH" ? "bg-orange-500 text-white shadow-sm" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {chat.crisisSeverity}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
