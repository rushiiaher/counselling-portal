"use client";

import React, { useState, useEffect, useRef, useTransition, use } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { staffLoadSessionAction, staffReplyAction, closeCrisisSessionAction } from "@/app/actions/chat.actions";
import { Feedback } from "@/lib/feedback";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, ArrowLeft, Send, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = { id: string; sender: string; content: string; createdAt: string };
type Session = { id: string; status: string; crisisSeverity: string; language: string; topic: string | null };

export default function StaffChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: sessionId } = use(params);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const res = await staffLoadSessionAction(sessionId);
    if (res.success) {
      setMessages(res.messages as Message[]);
      setSession(res.session as Session);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [sessionId]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleReply = () => {
    if (!reply.trim()) return;
    const content = reply.trim();
    setReply("");
    startTransition(async () => {
      const res = await staffReplyAction(sessionId, content);
      if (res.success) {
        await load();
      } else {
        Feedback.error(res.error || "Failed to send");
      }
    });
  };

  const handleClose = () => {
    startTransition(async () => {
      const res = await closeCrisisSessionAction(sessionId);
      if (res.success) {
        Feedback.success("Session closed");
        router.push("/staff/inbox");
      } else {
        Feedback.error(res.error || "Failed to close");
      }
    });
  };

  const isCrisis = session?.crisisSeverity === "CRITICAL" || session?.crisisSeverity === "HIGH";

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/staff/inbox" className="text-slate-400 hover:text-slate-700 transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Anonymous Session
                {isCrisis && <AlertTriangle className="w-5 h-5 text-rose-500" />}
              </h1>
              {session && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {session.status} · {session.crisisSeverity} severity · {session.language.toUpperCase()}
                  {session.topic && ` · ${session.topic}`}
                </p>
              )}
            </div>
          </div>
          {session?.status !== "CLOSED" && (
            <button
              onClick={handleClose}
              disabled={isPending}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition disabled:opacity-50"
            >
              <X className="w-3.5 h-3.5" /> Close Session
            </button>
          )}
        </div>

        {isCrisis && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-sm font-bold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Crisis escalation detected. Respond promptly or refer to emergency services.
          </div>
        )}

        {loading ? (
          <div className="text-center text-slate-400 py-16">Loading transcript...</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <p className="text-center text-slate-400 text-sm pt-8">No messages in this session.</p>
              )}
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "COUNSELLOR" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === "COUNSELLOR"
                      ? "bg-slate-900 text-white rounded-br-sm"
                      : msg.sender === "SYSTEM"
                      ? "bg-amber-50 text-amber-800 border border-amber-200 text-xs italic"
                      : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === "COUNSELLOR" ? "text-slate-400" : "text-slate-400"}`}>
                      {msg.sender === "COUNSELLOR" ? "You" : msg.sender === "SYSTEM" ? "System" : "Anonymous"}
                      {" · "}{formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {session?.status !== "CLOSED" && (
              <div className="border-t border-slate-100 p-4 flex gap-3">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
                  placeholder="Type a response... (Enter to send)"
                  rows={2}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-slate-900 outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleReply}
                  disabled={isPending || !reply.trim()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition disabled:opacity-50 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}

            {session?.status === "CLOSED" && (
              <div className="border-t border-slate-100 p-4 text-center text-sm text-slate-400">
                This session has been closed.
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
