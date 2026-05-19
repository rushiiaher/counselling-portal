"use client";

import React, { useState } from "react";
import { createNoteAction } from "@/app/actions/clinical.actions";
import { Feedback } from "@/lib/feedback";
import { useRouter } from "next/navigation";
import { ClinicalNoteType } from "@prisma/client";
import { Lock } from "lucide-react";

interface Props {
  patientId: string;
}

export default function ClinicalNoteEditor({ patientId }: Props) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [type, setType] = useState<ClinicalNoteType>("SESSION");
  const [elevated, setElevated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    
    const res = await createNoteAction(patientId, content, type, elevated);
    if (res.success) {
      Feedback.success("Clinical note saved securely.");
      setContent("");
      router.refresh();
    } else {
      Feedback.error(res.error || "Failed to save note.");
    }
    
    setIsSaving(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lock className="w-4 h-4 text-slate-400" /> New Clinical Note
      </h3>
      
      <div className="flex gap-4 mb-4">
        <select 
          value={type} 
          onChange={e => setType(e.target.value as ClinicalNoteType)}
          className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
        >
          <option value="SESSION">Session Note</option>
          <option value="CRISIS">Crisis Interaction</option>
          <option value="FOLLOW_UP">Follow-up Note</option>
          <option value="REFERRAL">Referral Context</option>
        </select>

        <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
          <input type="checkbox" checked={elevated} onChange={e => setElevated(e.target.checked)} className="rounded text-slate-900 w-4 h-4" />
          Requires Elevated Access
        </label>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={6}
        placeholder="Enter structured clinical observations here..."
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition resize-y text-sm font-mono"
      />

      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleSave} 
          disabled={isSaving || !content.trim()}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow hover:bg-slate-800 transition disabled:opacity-50"
        >
          {isSaving ? "Encrypting & Saving..." : "Save Secure Note"}
        </button>
      </div>
    </div>
  );
}
