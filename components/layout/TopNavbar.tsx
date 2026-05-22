"use client";

import React, { useState, useRef, useEffect } from 'react';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, ChevronDown } from 'lucide-react';

export default function TopNavbar({ navigation }: { navigation: any }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = session?.user?.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "U";

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm z-30 shrink-0">
      <div className="flex items-center md:hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-50">
          Skip to content
        </a>
        <span className="font-bold text-lg text-slate-800">Counselling Portal</span>
      </div>

      <div className="hidden md:flex items-center">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:z-50">
          Skip to content
        </a>
        <h2 className="text-lg font-semibold text-slate-800">Portal</h2>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        {/* User menu */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition focus-visible:ring-2 focus-visible:ring-slate-900 outline-none"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              {initials}
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
              {session?.user?.name ?? "User"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50">
              <div className="px-4 py-2.5 border-b border-slate-50">
                <p className="text-sm font-semibold text-slate-800 truncate">{session?.user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
                <p className="text-xs text-slate-400 capitalize">{(session?.user as any)?.role?.toLowerCase()}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
