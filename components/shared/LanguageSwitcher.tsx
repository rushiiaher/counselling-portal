"use client";
import React from 'react';

export default function LanguageSwitcher() {
  return (
    <div className="flex gap-2 items-center text-sm">
      <button className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300">English</button>
      <button className="px-2 py-1 rounded hover:bg-slate-100">اردو</button>
    </div>
  );
}
