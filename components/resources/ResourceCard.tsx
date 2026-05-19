import React from "react";
import Link from "next/link";
import { Clock, BookOpen, ThumbsUp } from "lucide-react";

interface ResourceCardProps {
  resource: {
    title: string;
    slug: string;
    excerpt: string | null;
    category: string;
    readingMinutes: number | null;
    helpfulCount: number;
    publishedAt: Date | null;
  }
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={`/resources/${resource.slug}`} className="group h-full flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
            {resource.category.replace("_", " ")}
          </span>
          {resource.readingMinutes && (
            <span className="flex items-center text-xs text-slate-500 gap-1">
              <Clock className="w-3 h-3" /> {resource.readingMinutes} min read
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-slate-900 leading-snug">
          {resource.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
          {resource.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-blue-600 transition">
            <BookOpen className="w-3.5 h-3.5" /> Read Article
          </span>
          {resource.helpfulCount > 0 && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {resource.helpfulCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
