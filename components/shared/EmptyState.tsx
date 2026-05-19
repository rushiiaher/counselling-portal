import React from "react";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ title, description, icon, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
      <div className="text-slate-400 mb-4 bg-white p-4 rounded-full shadow-sm border border-slate-100">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      
      {actionLabel && actionHref && (
        <Link 
          href={actionHref}
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
