"use client";
import React, { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { markResourceHelpful } from "@/app/actions/resource.actions";

export default function HelpfulWidget({ resourceId, initialCount }: { resourceId: string, initialCount: number }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    if (hasVoted || isSubmitting) return;
    setIsSubmitting(true);
    
    // Server action handles DB increment and simple cookie rate-limiting
    const res = await markResourceHelpful(resourceId);
    if (res.success) {
      setCount(prev => prev + 1);
      setHasVoted(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-xl shadow-sm mt-12">
      <h3 className="font-semibold text-slate-800 mb-4">Was this resource helpful?</h3>
      <button 
        onClick={handleVote}
        disabled={hasVoted || isSubmitting}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition ${
          hasVoted 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-emerald-600" : ""}`} />
        {hasVoted ? "Thank you for your feedback!" : `Yes (${count})`}
      </button>
    </div>
  );
}
