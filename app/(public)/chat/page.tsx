"use client";

import React, { useEffect, useState, useRef } from "react";
import PageContainer from "@/components/shared/PageContainer";
import { Send, AlertTriangle, Phone } from "lucide-react";
import { startChatAction, sendMessageAction, loadMessagesAction } from "@/app/actions/chat.actions";

export default function AnonymousChatPage() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [severity, setSeverity] = useState<string>("LOW");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("anon_session_token");
    if (token) {
      setSessionToken(token);
      loadSession(token);
    }
  }, []);

  const loadSession = async (token: string) => {
    const res = await loadMessagesAction(token);
    if (res.success && res.session) {
      setMessages(res.messages);
      setSeverity(res.session.crisisSeverity);
    } else {
      localStorage.removeItem("anon_session_token");
      setSessionToken(null);
    }
  };

  // Safe polling for MVP (no external socket dependencies, works through encryption)
  useEffect(() => {
    if (!sessionToken) return;
    const interval = setInterval(() => {
      loadSession(sessionToken);
    }, 5000);
    return () => clearInterval(interval);
  }, [sessionToken]);

  const handleStart = async () => {
    setIsStarting(true);
    const res = await startChatAction();
    if (res.success && res.token) {
      localStorage.setItem("anon_session_token", res.token);
      setSessionToken(res.token);
      // load empty state immediately
      loadSession(res.token);
    }
    setIsStarting(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionToken) return;

    const content = input;
    setInput("");
    
    // Optimistic UX
    const tempMsg = { id: Date.now().toString(), sender: "ANONYMOUS", content, createdAt: new Date() };
    setMessages(prev => [...prev, tempMsg]);

    const res = await sendMessageAction(sessionToken, content);
    if (res.success && res.severity) {
      setSeverity(res.severity); // Update UI immediately if escalated
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!sessionToken) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Anonymous Support</h1>
          <p className="text-slate-500 mb-8 text-sm">Talk to a professional. No account required. Your conversation is secure and strictly confidential.</p>
          
          <button 
            onClick={handleStart}
            disabled={isStarting}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium shadow hover:bg-slate-800 transition disabled:opacity-70"
          >
            {isStarting ? "Connecting..." : "Start Secure Chat"}
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 max-w-3xl">
      {(severity === "HIGH" || severity === "CRITICAL") && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-t-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 text-rose-800">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">You are not alone. If you are in immediate danger, please contact emergency services.</p>
          </div>
          <a href="tel:112" className="shrink-0 bg-rose-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-rose-700 transition">
            <Phone className="w-4 h-4" /> Call Helpline
          </a>
        </div>
      )}

      <div className={`bg-white shadow-sm flex flex-col h-[600px] border-x border-b border-slate-200 ${severity === "LOW" || severity === "MEDIUM" ? "rounded-xl border-t" : "rounded-b-xl"}`}>
        {/* Offline Fallback Warning - Transparent handling */}
        <div className="bg-amber-50 text-amber-800 text-xs px-4 py-2.5 border-b border-amber-100 flex justify-center text-center font-medium leading-relaxed">
          If a counsellor is not immediately online, your message is queued. We will respond as soon as possible.
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "ANONYMOUS" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                msg.sender === "ANONYMOUS" 
                  ? "bg-slate-900 text-white rounded-br-none" 
                  : msg.sender === "SYSTEM" 
                    ? "bg-transparent shadow-none text-slate-500 rounded-bl-none text-center italic mx-auto text-xs" 
                    : "bg-white text-slate-800 rounded-bl-none border border-slate-200"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-slate-100 flex gap-3 bg-white">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message securely..."
            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-slate-400 focus:bg-white transition text-sm"
          />
          <button type="submit" disabled={!input.trim()} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition shadow-sm">
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
